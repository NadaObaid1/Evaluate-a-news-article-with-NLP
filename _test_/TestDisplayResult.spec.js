import { displayRes } from '../src/client/js/displayResult.js';

describe('displayRes function', () => {
  let resultElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="sentimentResult"></div>
    `;
    resultElement = document.getElementById('sentimentResult');
  });

  test('should display the correct sentiment results', () => {
    const polarity = 'P';
    const agreement = 'High';
    const subjectivity = 'Subjective';
    const confidence = '85';
    const irony = 'None';

    displayRes(polarity, agreement, subjectivity, confidence, irony);

    const boxes = resultElement.getElementsByClassName('result-box');

    expect(boxes[0].querySelector('h3').textContent).toBe('Polarity');
    expect(boxes[0].querySelector('p').textContent).toBe('Positive');

    expect(boxes[1].querySelector('h3').textContent).toBe('Agreement');
    expect(boxes[1].querySelector('p').textContent).toBe('High');

    expect(boxes[2].querySelector('h3').textContent).toBe('Subjectivity');
    expect(boxes[2].querySelector('p').textContent).toBe('Subjective');

    expect(boxes[3].querySelector('h3').textContent).toBe('Confidence');
    expect(boxes[3].querySelector('p').textContent).toBe('85%');

    expect(boxes[4].querySelector('h3').textContent).toBe('Irony');
    expect(boxes[4].querySelector('p').textContent).toBe('None');
  });

  test('should handle missing values', () => {
    const polarity = 'NONE';
    const agreement = '';
    const subjectivity = '';
    const confidence = '';
    const irony = '';

    displayRes(polarity, agreement, subjectivity, confidence, irony);

    const boxes = resultElement.getElementsByClassName('result-box');

    expect(boxes[0].querySelector('h3').textContent).toBe('Polarity');
    expect(boxes[0].querySelector('p').textContent).toBe('Without');

    expect(boxes[1].querySelector('h3').textContent).toBe('Agreement');
    expect(boxes[1].querySelector('p').textContent).toBe('N/A');

    expect(boxes[2].querySelector('h3').textContent).toBe('Subjectivity');
    expect(boxes[2].querySelector('p').textContent).toBe('N/A');

    expect(boxes[3].querySelector('h3').textContent).toBe('Confidence');
    expect(boxes[3].querySelector('p').textContent).toBe('N/A');

    expect(boxes[4].querySelector('h3').textContent).toBe('Irony');
    expect(boxes[4].querySelector('p').textContent).toBe('N/A');
  });
});
