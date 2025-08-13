const { database } = require('../config/supabaseConfig');

class SupabaseService {
  async uploadOutlines(userId, outlines) {
    const { data, error } = await database('outlines').insert({
      user_id: userId,
      full_novel_outline: outlines.novel,
      series_outline: outlines.series,
      worldbuilding: outlines.worldbuilding
    }).select();
    
    return { data, error };
  }

  async generateChapter(outlineId, chapterNumber, draft) {
    const { data, error } = await database('chapters').insert({
      outline_id: outlineId,
      chapter_number: chapterNumber,
      draft: draft
    }).select();
    
    return { data, error };
  }
}

module.exports = SupabaseService;
