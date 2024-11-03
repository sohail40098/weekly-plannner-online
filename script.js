document.getElementById('download').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set the starting position for the content
    let verticalPosition = 20;

    // Add content for each day
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    days.forEach((day) => {
        // Get the corresponding textarea value
        const textArea = document.getElementById(day).querySelector('textarea');
        const text = textArea ? textArea.value : '';

        // Set the title for the day
        doc.setFontSize(16);
        doc.setTextColor(33, 150, 243);
        doc.text(day.charAt(0).toUpperCase() + day.slice(1), 20, verticalPosition);
        verticalPosition += 10; // Move down for the text

        // Add the text for the day
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 20, verticalPosition);
        verticalPosition += splitText.length * 7 + 10; // Adjust position for next section

        // Draw a line for separation
        doc.setDrawColor(220, 220, 220);
        doc.line(20, verticalPosition - 5, 190, verticalPosition - 5);
    });

    // Save the PDF
    doc.save("Weekly_Planner.pdf");
});

document.getElementById('print').addEventListener('click', function() {
    // Hide header, footer, and buttons before printing
    const originalBody = document.body.innerHTML;
    const printContents = document.querySelector('.planner').innerHTML;
    
    // Set body content for printing
    document.body.innerHTML = printContents;
    
    // Print the content
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalBody;
});