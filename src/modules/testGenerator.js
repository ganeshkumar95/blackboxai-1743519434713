export class TestGenerator {
  constructor() {
    this.setupTestGeneration();
  }

  setupTestGeneration() {
    document.getElementById('generate-test-btn')?.addEventListener(
      'click', 
      () => this.generateTests()
    );
  }

  generateTests() {
    const status = document.getElementById('response-status').value;
    const testResults = document.getElementById('test-results');
    
    // Status test
    testResults.querySelector('pre:nth-child(2)').textContent = 
`pm.test("Status is ${status}", function() {
  pm.response.to.have.status(${status});
});`;

    // Response time test
    testResults.querySelector('pre:nth-child(5)').textContent = 
`pm.test("Response time < 500ms", function() {
  pm.expect(pm.response.responseTime).to.be.below(500);
});`;

    // Show tests tab
    document.querySelector('[data-tab="response-tests"]').click();
  }
}