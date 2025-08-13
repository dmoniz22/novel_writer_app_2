class ChapterDisplay {
  constructor() {
    this.chapterContainer = document.getElementById('chapter-container');
    this.init();
  }

  init() {
    this.chapterContainer.innerHTML = 
      <div class=\
chapter-box\>
        <h2>Chapter Display</h2>
        <p>Chapter content will appear here.</p>
      </div>
    ;
  }
}
