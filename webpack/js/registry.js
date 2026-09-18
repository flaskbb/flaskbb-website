export function initRegistry(root) {
  const toolbar = root.querySelector('[data-registry-toolbar]');
  const search = root.querySelector('[data-registry-search]');
  const kindButtons = root.querySelectorAll('[data-registry-kind]');
  const entries = root.querySelectorAll('[data-registry-entry]');
  const empty = root.querySelector('[data-registry-empty]');
  let kind = '';

  function apply() {
    const terms = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    entries.forEach(function (entry) {
      const matchesKind = !kind || entry.dataset.kind === kind;
      const matchesTerms = terms.every(function (term) {
        return entry.dataset.search.includes(term);
      });
      entry.hidden = !(matchesKind && matchesTerms);
      if (!entry.hidden) visible++;
    });
    empty.hidden = visible > 0;
  }

  kindButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      kind = button.dataset.registryKind;
      kindButtons.forEach(function (other) {
        other.classList.toggle('active', other === button);
        other.setAttribute('aria-pressed', other === button);
      });
      apply();
    });
  });
  search.addEventListener('input', apply);

  toolbar.hidden = false;
}
