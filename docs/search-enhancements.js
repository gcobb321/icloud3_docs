(function () {
  const HIGHLIGHT_CLASS = 'icloud3-search-hit';
  const MAX_HIGHLIGHTS = 500;
  const MIN_QUERY_LENGTH = 2;

  let activeQuery = '';

  function cleanBreadcrumbs(root = document) {
    root.querySelectorAll('.search-breadcrumb').forEach(label => {
      const walker = document.createTreeWalker(
        label,
        NodeFilter.SHOW_TEXT
      );

      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(node => {
        // Remove raw HTML image tags from source labels.
        node.textContent = node.textContent
          .replace(/<img\b[^>]*>/gi, '')
          .replace(/\s+/g, ' ');
      });
    });
  }

  function clearHighlights(article) {
    article.querySelectorAll(`mark.${HIGHLIGHT_CLASS}`).forEach(mark => {
      mark.replaceWith(document.createTextNode(mark.textContent));
    });
    article.normalize();
  }

  function highlightDocument(query) {
    const article = document.querySelector('.markdown-section');
    if (!article) return;

    clearHighlights(article);

    if (!query || query.length < MIN_QUERY_LENGTH) return;

    const walker = document.createTreeWalker(
      article,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          if (node.parentElement?.closest(
            'script, style, pre, code, mark, a, button'
          )) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    let count = 0;
    const term = query.toLowerCase();

    nodes.forEach(node => {
      let remaining = node;

      while (remaining && count < MAX_HIGHLIGHTS) {
        const index = remaining.nodeValue.toLowerCase()
          .indexOf(term);

        if (index === -1) break;

        const match = remaining.splitText(index);
        remaining = match.splitText(query.length);

        const mark = document.createElement('mark');
        mark.className = HIGHLIGHT_CLASS;
        mark.textContent = match.nodeValue;
        match.replaceWith(mark);

        count++;
      }
    });
  }

  function resetHighlights() {
    activeQuery = '';
    highlightDocument('');
  }

  function install(hook) {
    hook.mounted(function () {
      const sidebar = document.querySelector('.sidebar') || document.body;
      const observer = new MutationObserver(() => cleanBreadcrumbs(sidebar));
      observer.observe(sidebar, {
        childList: true,
        subtree: true
      });
      cleanBreadcrumbs(sidebar);

      document.addEventListener('input', function (event) {
        if (!(event.target instanceof HTMLInputElement)) return;
        if (!event.target.matches('.search input')) return;

        if (event.target.value.trim() !== activeQuery) {
          resetHighlights();
        }
      }, true);

      document.addEventListener('search', function (event) {
        if (!(event.target instanceof HTMLInputElement)) return;
        if (!event.target.matches('.search input')) return;

        if (!event.target.value.trim()) resetHighlights();
      }, true);

      document.addEventListener('click', function (event) {
        if (!(event.target instanceof Element)) return;

        if (event.target.closest('.search .clear-button')) {
          resetHighlights();
          return;
        }

        if (!event.target.closest('.matching-post a')) return;

        const search = event.target.closest('.search');
        activeQuery = search?.querySelector('input')?.value.trim() || '';

        // Also handles links to sections on the current page.
        window.setTimeout(() => highlightDocument(activeQuery), 150);
      }, true);
    });

    hook.doneEach(function () {
      highlightDocument(activeQuery);
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [
    ...(window.$docsify.plugins || []),
    install
  ];
})();
