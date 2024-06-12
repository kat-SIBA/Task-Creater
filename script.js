document.addEventListener('DOMContentLoaded', function() {
  const calendarHeader = document.getElementById('month-year');
  const calendarDates = document.getElementById('calendar-dates');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const modal = document.getElementById('event-modal');
  const closeModal = document.querySelector('.close');
  const eventForm = document.getElementById('event-form');
  const eventTitleInput = document.getElementById('event-title');
  const eventsList = document.getElementById('events-list');
  const testMicButton = document.getElementById('test-mic-button');

  let currentDate = new Date();
  let events = {}; // Store events as an object

  function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      calendarHeader.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
      
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      const today = new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

      calendarDates.innerHTML = '';

      for (let i = 0; i < firstDay; i++) {
          calendarDates.innerHTML += `<span></span>`;
      }

      for (let i = 1; i <= lastDate; i++) {
          let dayClass = '';
          if (isCurrentMonth && i === today.getDate()) {
              dayClass = 'today';
          }

          calendarDates.innerHTML += `<span class="${dayClass}" data-date="${year}-${month + 1}-${i}">${i}</span>`;
      }

      renderEvents();
  }

  function showEventModal(date) {
      modal.style.display = 'block';
      modal.setAttribute('data-date', date);
  }

  function closeEventModal() {
      modal.style.display = 'none';
  }

  function renderEvents() {
      eventsList.innerHTML = '';

      for (const [date, eventTitle] of Object.entries(events)) {
          const listItem = document.createElement('li');
          listItem.textContent = `${date}: ${eventTitle}`;
         
          const deleteButton = document.createElement('button');
          deleteButton.textContent ='Delete';

          deleteButton.addEventListener('click',()=>{
            delete events[date];

            renderEvents();
          });

          listItem.appendChild(deleteButton);
          eventsList.appendChild(listItem);
      }
  }

  prevButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
  });

  nextButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
  });

  calendarDates.addEventListener('click', function(event) {
      if (event.target.dataset.date) {
          showEventModal(event.target.dataset.date);
      }
  });

  closeModal.addEventListener('click', closeEventModal);

  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          closeEventModal();
      }
  });

  eventForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const eventDate = modal.getAttribute('data-date');
      const eventTitle = eventTitleInput.value;

      if (eventDate && eventTitle) {
          events[eventDate] = eventTitle;
          renderCalendar();
          closeEventModal();
          eventTitleInput.value = '';
      }
  });

  // Function to add event using speech
  function addEventFromSpeech(event) {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const match = transcript.match(/add event (.+)/);
      if (match) {
          eventTitleInput.value = match[1].trim();
      } else {
          alert('Speech does not match expected format. Please try again.');
      }
  }

  // Create a SpeechRecognition object
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  // Add event listener for speech recognition result
  recognition.onresult = function(event) {
      addEventFromSpeech(event);
  };

  // Add event listener for error
  recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
          // No speech detected
          alert('No speech detected. Please try again.');
      } else if (event.error === 'audio-capture') {
          // Microphone access error
          alert('Error accessing microphone. Please check your microphone settings and try again.');
      } else if (event.error === 'not-allowed') {
          // Microphone permission not granted
          alert('Microphone access not allowed. Please grant microphone permission and try again.');
      }
  };

  // Function to test microphone accessibility
  function testMicrophone() {
      if (!('webkitSpeechRecognition' in window)) {
          alert('Speech recognition is not supported in this browser.');
          return;
      }

      const testRecognition = new webkitSpeechRecognition();
      testRecognition.continuous = false;
      testRecognition.lang = 'en-US';

      testRecognition.onstart = function() {
          alert('Microphone is accessible.');
      };

      testRecognition.onend = function() {
          alert('Microphone test complete.');
      };

      testRecognition.start();
  }

  // Attach event listener to the test mic button
  testMicButton.addEventListener('click', testMicrophone);

  renderCalendar(); // Initial calendar rendering
});
document.addEventListener('DOMContentLoaded', function() {
  const eventTitleInput = document.getElementById('event-title');

  // Function to add event using speech
  function addEventFromSpeech(event) {
      const transcript = event.results[0][0].transcript.toLowerCase(); // Convert to lowercase for case insensitivity
      const addEventIndex = transcript.indexOf('add event');
      if (addEventIndex !== -1) {
          const eventTitle = transcript.substring(addEventIndex + 'add event'.length).trim();
          eventTitleInput.value = eventTitle;
      } else {
          alert('No valid event phrase detected. Please try again.');
      }
  }

  // Create a SpeechRecognition object
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  // Add event listener for speech recognition result
  recognition.onresult = function(event) {
      addEventFromSpeech(event);
  };

  // Add event listener for error
  recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
          // No speech detected
          alert('No speech detected. Please try again.');
      } else if (event.error === 'audio-capture') {
          // Microphone access error
          alert('Error accessing microphone. Please check your microphone settings and try again.');
      } else if (event.error === 'not-allowed') {
          // Microphone permission not granted
          alert('Microphone access not allowed. Please grant microphone permission and try again.');
      }
  };

  // Function to test microphone accessibility
  function testMicrophone() {
      if (!('webkitSpeechRecognition' in window)) {
          alert('Speech recognition is not supported in this browser.');
          return;
      }

      const testRecognition = new webkitSpeechRecognition();
      testRecognition.continuous = false;
      testRecognition.lang = 'en-US';

      testRecognition.onstart = function() {
          alert('Microphone is accessible.');
      };

      testRecognition.onend = function() {
          alert('Microphone test complete.');
      };

      testRecognition.start();
  }

  // Attach event listener to the test mic button
  document.getElementById('test-mic-button').addEventListener('click', testMicrophone);

  // Start speech recognition
  function startSpeechRecognition() {
      recognition.start();
  }

  // Attach event listener to the event title input for starting speech recognition
  eventTitleInput.addEventListener('click', function() {
      startSpeechRecognition();
  });
});
