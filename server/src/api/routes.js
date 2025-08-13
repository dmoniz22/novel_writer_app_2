// API routes
module.exports = function routes(supabase, mindsdb) {
    const express = require('express');
    const router = express.Router();
    const supabaseService = new (require('./supabaseService'))();

    // Auth endpoint for SSO
    router.post('/auth', async (req, res) => {
        try {
            const { provider } = req.body;
            // Implement SSO flow here
            console.log("Attempting SSO with provider: ", provider);
            //const { data, error } = await supabase.auth.signInWithOAuth({ provider: provider });

            //if (error) {
            //    throw error;
            //} else {
            //    console.log("SSO data: ", data);
            //    return res.json({ redirectUrl: data.url });
            //}
            return res.status(500).json({error: "Not Implemented"});

        } catch (error) {
            console.error("Error during SSO: ", error)
            res.status(500).json({ error: 'Authentication failed' });
        }
    });

    // Upload outlines
    router.post('/outlines', async (req, res) => {
        try {
            const { userId, novel_outline, chapter_outline, series_outline, worldbuilding, influential_authors } = req.body;

            const outlines = {
                novel_outline: novel_outline,
                chapter_outline: chapter_outline,
                series_outline: series_outline,
                worldbuilding: worldbuilding,
                influential_authors: influential_authors
            };

            const { data, error } = await supabaseService.uploadOutlines(userId, outlines);
            if (error) throw error;
            res.json({ data });
        } catch (error) {
            console.error("Error uploading outlines: ", error);
            res.status(500).json({ error: 'Outline upload failed' });
        }
    });

    // Generate chapter
    router.post('/generate/chapter', async (req, res) => {
        try {
            const { outlineId, chapterNumber, prompt } = req.body;

            // Get approved chapters for context
            //const { data: approvedChapters } = await supabaseService.getApprovedChapters(outlineId);

            // Create training data from approved chapters
            //const trainingData = approvedChapters.map(chapter => ({
            //    prompt: chapter.draft,
            //    completion: chapter.feedback || '' // Assuming this exists\n            //}));

            // Train model if not exists
            const modelName = `model-${outlineId}`;
            //try {
            //    // Check if model exists
            //    await mindsdb.createBookModel(outlineId, trainingData);
            //} catch (e) {
            //    // Model likely already exists, continue
            //    console.log("Model already exists, skipping creation.");
            //}

            // Generate chapter
            console.log("Generating chapter with model: ", modelName, " and prompt: ", prompt);
            const chapterContent = await mindsdb.generateChapter(modelName, prompt);

            // Save chapter
            //const { data } = await supabaseService.generateChapter(outlineId, chapterNumber, chapterContent);

            res.json({ chapter: chapterContent });
        } catch (error) {
            console.error("Error generating chapter: ", error);
            res.status(500).json({ error: 'Chapter generation failed' });
        }
    });

    return router;
}