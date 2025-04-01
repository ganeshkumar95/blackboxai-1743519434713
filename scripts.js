// DOM Elements
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Tab Switching
if (loginTab && registerTab && loginForm && registerForm) {
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('text-blue-600', 'border-blue-600');
        loginTab.classList.remove('text-gray-500');
        registerTab.classList.add('text-gray-500');
        registerTab.classList.remove('text-blue-600', 'border-blue-600');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('text-blue-600', 'border-blue-600');
        registerTab.classList.remove('text-gray-500');
        loginTab.classList.add('text-gray-500');
        loginTab.classList.remove('text-blue-600', 'border-blue-600');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
}

// Form Elements
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerConfirm = document.getElementById('register-confirm');

// Form Submission Handlers
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginEmail.value;
        const password = loginPassword.value;
        
        // Basic validation
        if (!email.includes('@')) {
            showError('Please enter a valid email');
            return;
        }
        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        // Show loading state
        toggleLoading(loginForm, true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showSuccess('Login successful!');
            // Redirect to dashboard after successful login
            window.location.href = 'dashboard.html';
        } catch (error) {
            showError('Login failed. Please try again.');
        } finally {
            toggleLoading(loginForm, false);
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = registerName.value;
        const email = registerEmail.value;
        const password = registerPassword.value;
        const confirm = registerConfirm.value;

        // Validation
        if (!name) {
            showError('Please enter your name');
            return;
        }
        if (!email.includes('@')) {
            showError('Please enter a valid email');
            return;
        }
        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }
        if (password !== confirm) {
            showError('Passwords do not match');
            return;
        }

        // Show loading state
        toggleLoading(registerForm, true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showSuccess('Registration successful!');
            // Switch to login tab after registration
            loginTab.click();
            registerForm.reset();
        } catch (error) {
            showError('Registration failed. Please try again.');
        } finally {
            toggleLoading(registerForm, false);
        }
    });
}

// Utility Functions
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 p-4 bg-red-500 text-white rounded-lg shadow-lg z-50';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

function toggleLoading(form, isLoading) {
    const button = form.querySelector('button[type="submit"]');
    const spinner = document.createElement('div');
    spinner.className = 'inline-block ml-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent';
    
    if (isLoading) {
        button.disabled = true;
        button.insertAdjacentElement('beforeend', spinner);
    } else {
        button.disabled = false;
        const existingSpinner = button.querySelector('.animate-spin');
        if (existingSpinner) existingSpinner.remove();
    }
}

// Workspace Modal Handling
if (document.getElementById('new-workspace-btn')) {
    document.getElementById('new-workspace-btn').addEventListener('click', () => {
        document.getElementById('workspace-modal').classList.remove('hidden');
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('workspace-modal').classList.add('hidden');
        document.getElementById('workspace-form').reset();
    });

    document.getElementById('workspace-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('workspace-name').value;
        const description = document.getElementById('workspace-description').value;

        if (!name) {
            showError("Workspace name is required");
            return;
        }

        // Create workspace card
        const workspacesContainer = document.getElementById('workspaces-container');
        const workspaceCard = document.createElement('div');
        workspaceCard.className = 'bg-white p-4 rounded shadow hover:shadow-lg transition duration-200';
        workspaceCard.innerHTML = `
            <img src="https://images.pexels.com/photos/356970/pexels-photo-356970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                 alt="Workspace" class="w-full h-48 object-cover rounded mb-2">
            <h3 class="text-lg font-medium">${name}</h3>
            <p class="text-gray-600 text-sm">${description || 'No description'}</p>
        `;
        workspacesContainer.appendChild(workspaceCard);

        showSuccess("Workspace created!");
        document.getElementById('workspace-modal').classList.add('hidden');
        document.getElementById('workspace-form').reset();
    });
}

// Collection Modal Handling
if (document.getElementById('new-collection-btn')) {
    document.getElementById('new-collection-btn').addEventListener('click', () => {
        document.getElementById('collection-modal').classList.remove('hidden');
    });

    document.getElementById('close-collection-modal').addEventListener('click', () => {
        document.getElementById('collection-modal').classList.add('hidden');
        document.getElementById('collection-form').reset();
    });

    document.getElementById('collection-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('collection-name').value;
        const description = document.getElementById('collection-description').value;

        if (!name) {
            showError("Collection name is required");
            return;
        }

        // Create collection card
        const collectionsContainer = document.getElementById('collections-container');
        const collectionCard = document.createElement('div');
        collectionCard.className = 'bg-white p-4 rounded shadow hover:shadow-lg transition duration-200';
        collectionCard.innerHTML = `
            <img src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                 alt="Collection" class="w-full h-48 object-cover rounded mb-2">
            <h3 class="text-lg font-medium">${name}</h3>
            <p class="text-gray-600 text-sm">${description || 'No description'}</p>
        `;
        collectionsContainer.appendChild(collectionCard);

        showSuccess("Collection created!");
        document.getElementById('collection-modal').classList.add('hidden');
        document.getElementById('collection-form').reset();
        
        // Save to localStorage
        const collections = JSON.parse(localStorage.getItem('collections') || '[]');
        collections.push({
            workspace,
            name,
            description,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('collections', JSON.stringify(collections));
    });
}

// API Designer Functionality
if (document.getElementById('api-title')) {
    // Tab Switching
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        if (!tabButtons.length) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                try {
                    // Remove active class from all tabs
                    document.querySelectorAll('.tab-btn').forEach(btn => {
                        btn?.classList?.remove('border-b-2', 'border-blue-500', 'text-blue-600');
                        btn?.classList?.add('text-gray-600');
                    });
                    
                    // Add active class to clicked tab
                    button?.classList?.add('border-b-2', 'border-blue-500', 'text-blue-600');
                    button?.classList?.remove('text-gray-600');
                    
                    // Hide all tab contents
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content?.classList?.add('hidden');
                        content?.classList?.remove('active');
                    });
                    
                    // Show selected tab content
                    const tabId = button.dataset.tab + '-tab';
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) {
                        tabContent.classList.remove('hidden');
                        tabContent.classList.add('active');
                    }
                } catch (error) {
                    console.error('Tab switch error:', error);
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
    } else {
        initTabs();
    }

// Header Management Functions
function addHeaderRow() {
  const container = document.getElementById('headers-container');
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
      <button class="delete-header text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  container.appendChild(row);
  
  // Add event to new delete button
  row.querySelector('.delete-header').addEventListener('click', () => {
    row.remove();
  });
}

// Initialize headers
document.getElementById('add-header').addEventListener('click', addHeaderRow);
addHeaderRow(); // Add first header row by default

// Add Parameter Row
document.getElementById('add-param').addEventListener('click', () => {
        const paramsContainer = document.getElementById('params-container');
        const paramRow = document.createElement('div');
        paramRow.className = 'grid grid-cols-12 gap-2 mb-2 items-center';
        paramRow.innerHTML = `
            <div class="col-span-1">
                <input type="checkbox" checked class="h-4 w-4">
            </div>
            <div class="col-span-4">
                <input type="text" class="input-field text-sm" placeholder="param">
            </div>
            <div class="col-span-5">
                <input type="text" class="input-field text-sm" placeholder="value">
            </div>
            <div class="col-span-2">
                <input type="text" class="input-field text-sm" placeholder="description">
            </div>
        `;
        paramsContainer.appendChild(paramRow);
    });

    // Send API Request
    document.getElementById('test-api-btn').addEventListener('click', async () => {
        const method = document.getElementById('http-method').value;
        const url = document.getElementById('api-url').value;
        
        if (!url) {
            showError('Please enter a valid URL');
            return;
        }

        // Show loading state
        const sendBtn = document.getElementById('test-api-btn');
        const originalText = sendBtn.innerHTML;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        sendBtn.disabled = true;

        try {
            const startTime = Date.now();
            const headers = {};
            
            // Collect headers from UI
            document.querySelectorAll('#headers-container .grid').forEach(row => {
              const checkbox = row.querySelector('input[type="checkbox"]');
              if (checkbox.checked) {
                const keyInput = row.querySelector('input[placeholder="Header name"]');
                const valueInput = row.querySelector('input[placeholder="Header value"]');
                if (keyInput.value) {
                  headers[keyInput.value] = valueInput.value;
                }
              }
            });

            const options = {
                method: method,
                headers: headers
            };

            // Add body if needed
            if (['POST', 'PUT', 'PATCH'].includes(method)) {
                const bodyType = document.querySelector('#body-tab select').value;
                const bodyContent = document.getElementById('request-body').value;
                
                if (bodyType !== 'None' && bodyContent) {
                    options.body = bodyContent;
                    if (bodyType === 'Raw') {
                        options.headers['Content-Type'] = 'application/json';
                    }
                }
            }

            const response = await fetch(url, options);
            const responseTime = Date.now() - startTime;
            const responseData = await response.text();
            const responseSize = responseData.length / 1024;

            // Display response
            document.getElementById('response-status').textContent = response.status;
            document.getElementById('response-time').textContent = `${responseTime} ms`;
            document.getElementById('response-size').textContent = `${responseSize.toFixed(2)} KB`;
            
            try {
                // Try to pretty print JSON
                const formattedJson = JSON.stringify(JSON.parse(responseData), null, 2);
                const responseBody = document.getElementById('response-body');
                responseBody.innerHTML = `<pre><code class="language-json">${formattedJson}</code></pre>`;
                if (window.Prism) {
                    Prism.highlightElement(responseBody.querySelector('code'));
                }
                displayResponseHeaders(response);
            } catch {
                // Fallback to raw text
                document.getElementById('response-body').textContent = responseData;
            }

            showSuccess(`Request completed (${response.status} ${response.statusText})`);
        } catch (error) {
            showError('Request failed: ' + error.message);
        } finally {
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
        }
    });
}

// Helper function to display response headers
function displayResponseHeaders(response) {
    const headersTab = document.getElementById('response-headers-tab');
    if (!headersTab) return;
    
    headersTab.innerHTML = '';
    const headersContainer = document.createElement('div');
    headersContainer.className = 'space-y-2';
    
    response.headers.forEach((value, key) => {
        const headerRow = document.createElement('div');
        headerRow.className = 'grid grid-cols-3 gap-4 p-2 hover:bg-gray-100 rounded';
        headerRow.innerHTML = `
            <div class="font-medium">${key}</div>
            <div class="col-span-2 text-gray-600 break-all">${value}</div>
        `;
        headersContainer.appendChild(headerRow);
    });
    
    headersTab.appendChild(headersContainer);
}

// Load collections from localStorage on page load
if (document.getElementById('collections-container')) {
    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    const container = document.getElementById('collections-container');
    
    collections.forEach(collection => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow hover:shadow-lg transition duration-200';
        card.dataset.workspace = collection.workspace;
        card.innerHTML = `
            <img src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                 alt="Collection" class="w-full h-48 object-cover rounded mb-2">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-lg font-medium">${collection.name}</h3>
                    <p class="text-gray-600 text-sm">${collection.description || 'No description'}</p>
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${collection.workspace}</span>
            </div>
        `;
        container.appendChild(card);
    });
}
