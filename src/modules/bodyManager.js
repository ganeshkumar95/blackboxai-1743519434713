export class BodyManager {
  constructor() {
    this.initFormDataTypes();
  }

  initFormDataTypes() {
    document.querySelectorAll('#form-data-container select').forEach(select => {
      select.addEventListener('change', (e) => this.handleTypeChange(e));
    });
  }

  handleTypeChange(e) {
    const row = e.target.closest('.grid');
    const valueInput = row.querySelector('.value-input');
    const fileInput = row.querySelector('.file-input');
    
    if (e.target.value === 'File') {
      valueInput.classList.add('hidden');
      fileInput.classList.remove('hidden');
    } else {
      valueInput.classList.remove('hidden');
      fileInput.classList.add('hidden');
    }
  }
}