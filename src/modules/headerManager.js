export class HeaderManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.container.addEventListener('click', (e) => this.handleClick(e));
    document.getElementById('add-header').addEventListener('click', () => this.addHeader());
  }

  handleClick(e) {
    if (e.target.closest('.delete-btn')) {
      e.target.closest('.grid').remove();
    }
  }

  addHeader() {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-12 gap-2 mb-2 items-center';
    row.innerHTML = `
      <div class="col-span-1 flex justify-center">
        <input type="checkbox" checked class="h-4 w-4">
      </div>
      <div class="col-span-4">
        <input type="text" class="input-field text-sm" placeholder="Header name">
      </div>
      <div class="col-span-5">
        <input type="text" class="input-field text-sm" placeholder="Header value">
      </div>
      <div class="col-span-2 flex justify-center">
        <button class="delete-btn text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    this.container.appendChild(row);
  }
}