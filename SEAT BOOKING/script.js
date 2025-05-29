document.addEventListener("DOMContentLoaded", function () {
    const seatMapContainer = document.getElementById('seat-map');
    const selectedSeatsDisplay = document.getElementById('selected-seats');
    const seatPriceDisplay = document.getElementById('seat-price');
    const sectorButtonsContainer = document.getElementById('sector-buttons');
    const rows = 10;
    const cols = 8;
    const bookedSeats = ['A3', 'B4', 'C1'];
    const seatPrice = 150; // in INR
    let selectedSeats = [];
    let currentSector = 0;
    const sectorSize = 2; // Show 2 rows at a time on mobile
  
    function renderSectorButtons() {
      sectorButtonsContainer.innerHTML = '';
      const totalSectors = Math.ceil(rows / sectorSize);
  
      for (let i = 0; i < totalSectors; i++) {
        const btn = document.createElement('button');
        btn.textContent = `Rows ${String.fromCharCode(65 + i * sectorSize)}-${String.fromCharCode(65 + Math.min((i + 1) * sectorSize - 1, rows - 1))}`;
        btn.addEventListener('click', () => {
          currentSector = i;
          renderSeatMap();
        });
        sectorButtonsContainer.appendChild(btn);
      }
    }
  
    function renderSeatMap() {
      seatMapContainer.innerHTML = '';
      const isMobile = window.innerWidth <= 600;
      const startRow = isMobile ? currentSector * sectorSize : 0;
      const endRow = isMobile ? Math.min(startRow + sectorSize, rows) : rows;
  
      for (let i = startRow; i < endRow; i++) {
        const row = document.createElement('div');
        row.classList.add('seat-row');
  
        for (let j = 0; j < cols; j++) {
          const seat = document.createElement('div');
          seat.classList.add('seat');
  
          const rowChar = String.fromCharCode(65 + i);
          const seatNum = j + 1;
          const seatId = `${rowChar}${seatNum}`;
          seat.setAttribute('data-seat-id', seatId);
          seat.title = `Seat ${seatId}`; // Tooltip
  
          if (bookedSeats.includes(seatId)) {
            seat.classList.add('booked');
          }
  
          seat.addEventListener('click', () => toggleSeat(seatId));
          row.appendChild(seat);
        }
  
        seatMapContainer.appendChild(row);
      }
  
      updateUI();
    }
  
    function toggleSeat(seatId) {
      if (bookedSeats.includes(seatId)) return;
  
      const index = selectedSeats.indexOf(seatId);
      if (index > -1) {
        selectedSeats.splice(index, 1);
      } else {
        selectedSeats.push(seatId);
      }
  
      updateUI();
    }
  
    function updateUI() {
      document.querySelectorAll('.seat').forEach(seat => {
        const seatId = seat.getAttribute('data-seat-id');
        seat.classList.remove('selected');
        if (selectedSeats.includes(seatId)) {
          seat.classList.add('selected');
        }
      });
  
      selectedSeatsDisplay.textContent =
        selectedSeats.length > 0
          ? `Selected: ${selectedSeats.join(', ')}`
          : 'You have selected: None';
  
      const totalPrice = selectedSeats.length * seatPrice;
      seatPriceDisplay.textContent =
        selectedSeats.length > 0
          ? `Total Price: ₹${totalPrice}`
          : '';
    }
  
    renderSectorButtons();
    renderSeatMap();
  });
  