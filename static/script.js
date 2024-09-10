document.addEventListener('DOMContentLoaded', function () {
  const bailForm = document.getElementById('bailForm');
  const employmentStatus = document.getElementById('employmentStatus');
  const employerContainer = document.getElementById('employerContainer');
  const criminalHistoryRadio = document.getElementsByName('criminalHistory');
  const criminalHistoryDetails = document.getElementById('criminalHistoryDetails');
  const legalRepresentationRadio = document.getElementsByName('legalRepresentation');
  const attorneyNameContainer = document.getElementById('attorneyNameContainer');

  employmentStatus.addEventListener('change', function () {
      if (employmentStatus.value === 'employed') {
          employerContainer.style.display = 'block';
      } else {
          employerContainer.style.display = 'none';
      }
  });

  criminalHistoryRadio.forEach(radio => {
      radio.addEventListener('change', function () {
          if (radio.value === 'yes') {
              criminalHistoryDetails.style.display = 'block';
          } else {
              criminalHistoryDetails.style.display = 'none';
          }
      });
  });

  legalRepresentationRadio.forEach(radio => {
      radio.addEventListener('change', function () {
          if (radio.value === 'yes') {
              attorneyNameContainer.style.display = 'block';
          } else {
              attorneyNameContainer.style.display = 'none';
          }
      });
  });

  bailForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(bailForm);

      const data = {
          fullName: formData.get('fullName'),
          dateOfBirth: formData.get('dateOfBirth'),
          address: formData.get('address'),
          phoneNumber: formData.get('phoneNumber'),
          email: formData.get('email'),
          employmentStatus: formData.get('employmentStatus'),
          employer: formData.get('employer'),
          chargesFiled: formData.get('chargesFiled'),
          arrestDate: formData.get('arrestDate'),
          bailAmount: formData.get('bailAmount'),
          criminalHistory: formData.get('criminalHistory'),
          priorArrests: formData.get('priorArrests'),
          priorConvictions: formData.get('priorConvictions'),
          financialResources: formData.get('financialResources'),
          legalRepresentation: formData.get('legalRepresentation'),
          attorneyName: formData.get('attorneyName'),
          communityTies: formData.get('communityTies'),
          additionalComments: formData.get('additionalComments')
      };

      // Generate PDF
      generatePDF(data);
  });

  function generatePDF(data) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('Bail Application Form', 10, 10);

      doc.setFontSize(12);
      const textLines = [
          `Full Name: ${data.fullName}`,
          `Date of Birth: ${data.dateOfBirth}`,
          `Address: ${data.address}`,
          `Phone Number: ${data.phoneNumber}`,
          `Email: ${data.email || 'N/A'}`,
          `Employment Status: ${data.employmentStatus}`,
          data.employer ? `Employer: ${data.employer}` : '',
          `Charges Filed: ${data.chargesFiled}`,
          `Arrest Date: ${data.arrestDate}`,
          data.bailAmount ? `Bail Amount: $${data.bailAmount}` : '',
          `Criminal History: ${data.criminalHistory}`,
          data.criminalHistory === 'yes' ? `Prior Arrests: ${data.priorArrests}` : '',
          data.criminalHistory === 'yes' ? `Prior Convictions: ${data.priorConvictions}` : '',
          data.financialResources ? `Financial Resources: ${data.financialResources}` : '',
          `Legal Representation: ${data.legalRepresentation}`,
          data.legalRepresentation === 'yes' ? `Attorney Name: ${data.attorneyName}` : '',
          data.communityTies ? `Community Ties: ${data.communityTies}` : '',
          data.additionalComments ? `Additional Comments: ${data.additionalComments}` : ''
      ].filter(Boolean);

      doc.text(textLines, 10, 20);

      // Save the PDF
      doc.save(`${data.fullName.replace(/\s+/g, '_')}_Bail_Application.pdf`);
  }
});


