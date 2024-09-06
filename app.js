function calculateBail() {
    const crimeSeverity = document.getElementById('crime-severity').value;
    const timeServed = parseInt(document.getElementById('time-served').value);
    const history = document.getElementById('history').value;
    const flightRisk = document.getElementById('flight-risk').value;
    const dangerSociety = document.getElementById('danger-society').value;
    const financialStability = document.getElementById('financial-stability').value;

    let eligibilityScore = 0;

    // Points logic based on conditions
    switch (crimeSeverity) {
        case 'misdemeanor':
            eligibilityScore += 2;
            break;
        case 'non-violent-felony':
            eligibilityScore -= 1;
            break;
        case 'violent-felony':
            eligibilityScore -= 3;
            break;
        case 'drug-trafficking':
            eligibilityScore -= 2;
            break;
        case 'fraud':
            eligibilityScore -= 1;
            break;
        case 'theft':
            eligibilityScore -= 1;
            break;
        case 'murder':
            eligibilityScore -= 5;
            break;
        default:
            break;
    }

    // Time Served
    if (timeServed > 12) eligibilityScore += 2;

    // Criminal History
    if (history === 'no') eligibilityScore += 2;
    else eligibilityScore -= 3;

    // Flight Risk
    if (flightRisk === 'low') eligibilityScore += 2;
    else if (flightRisk === 'high') eligibilityScore -= 2;

    // Danger to Society
    if (dangerSociety === 'low') eligibilityScore += 1;
    else eligibilityScore -= 2;

    // Financial Stability
    if (financialStability === 'high') eligibilityScore += 1;

    // Final Bail Eligibility
    const result = eligibilityScore >= 3 ? 'Eligible for Bail' : 'Not Eligible for Bail';
    const resultElement = document.getElementById('bail-result');
    resultElement.textContent = result;
    resultElement.classList.remove('hidden'); // Show the result box
}

// Accordion functionality for FAQ
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function () {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Slider functionality for Hero Section
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideInterval = 3000; // 3 seconds interval

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, slideInterval);