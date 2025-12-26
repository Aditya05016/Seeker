const Video = require("../models/Video");
const { YoutubeTranscript } = require("youtube-transcript");

// Logic 1: Fetch and Save
exports.fetchAndSaveTranscript = async (req, res) => {
    try {
        const { videoId } = req.body;

        if (!videoId) {
            return res.status(400).json({ message: "Video ID is required" });
        }

        // 1. Duplicate check
        const existingVideo = await Video.findOne({ videoId });
        if (existingVideo) {
            return res.status(200).json({ message: "Video already exists", data: existingVideo });
        }

        // 2. Fetch from YouTube
        const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);

        if (!transcriptData || transcriptData.length === 0) {
            return res.status(404).json({ message: "No transcript found for this video" });
        }

        // 3. Format the data for our Schema
        const formattedTranscript = transcriptData.map(item => ({
            text: item.text,
            start: item.offset, // library uses 'offset' for seconds
            duration: item.duration
        }));

        // 4. Create one long string for easy searching later
        const fullRawText = transcriptData.map(item => item.text).join(' ');

        // 5. Save to MongoDB
        const newVideo = new Video({
            videoId: videoId,
            title: `Video ${videoId}`, // Note: getting the real title needs another API, we can do that later
            transcript: formattedTranscript,
            rawText: fullRawText
        });

        const savedVideo = await newVideo.save();

        return res.status(201).json({
            message: "Transcript saved successfully",
            video: savedVideo
        });

    } catch (error) {
        console.error("Error in fetchAndSaveTranscript:", error.message);
        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

// Logic 2: Search (Placeholder for your next step)
exports.searchTranscript = async (req, res) => {
    try {
        const { q, videoId } = req.query; // 'q' is the search word

        if (!q) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // 1. Database se video find karein
        const video = await Video.findOne({ videoId });

        if (!video) {
            return res.status(404).json({ message: "Video not found in database" });
        }

        // 2. Transcript array mein wo word dhoondna
        // Hum check karenge ki kis entry ke 'text' mein user ka 'q' match hota hai
        const results = video.transcript.filter(item => 
            item.text.toLowerCase().includes(q.toLowerCase())
        );

        return res.status(200).json({
            keyword: q,
            results: results // Ye aapko text aur 'start' time dono dega
        });

    } catch (error) {
        res.status(500).json({ message: "Search error", error: error.message });
    }
};