// Sample test file to verify Jest configuration
import '@testing-library/jest-dom';

describe('Sample Test', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should handle DOM assertions', () => {
    document.body.innerHTML = '<div id="test">Test Content</div>';
    const element = document.getElementById('test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Test Content');
  });
});