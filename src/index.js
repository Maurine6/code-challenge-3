// Your code here

const url = 'http://localhost:3000/films'

document.addEventListener('DOMContentedLoaded', () => {
    
    getFilmList()

})


function getFilmList() {
    const filmList = document.getElementById('films');  
    fetch(url)
    .then(response => response.json())
    .then((data) => {
        const firstFilm = data[0];
        displayFilmDetails(firstFilm);

        data.forEach(film => {
            const list = document.createElement('li');
            list.innerText = film.title;
  
            list.addEventListener('click', () => {
            
            displayFilmDetails(film)
          });
  
          filmList.appendChild(list);

          console.log(film.title)
        });
      });
  }
  getFilmList();



function displayFilmDetails(film) {
    const image = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const filmInfo = document.getElementById('film-info')
    const showtime = document.getElementById('showtime');
    const tickets = document.getElementById('ticket-num');
        
        
    const capacity = `${film.capacity}`;
    const ticketSold = `${film.tickets_sold}`;


    const availableTickets = capacity - ticketSold;
        
        
    image.src = film.poster;
    title.innerText = `Title: ${film.title}`;
    runtime.innerText = `Runtime: ${film.runtime} minutes`;
    filmInfo.innerText = `${film.description}`;
    showtime.innerText = `Showtime: ${film.showtime}`;
    tickets.innerText = ` ${availableTickets}`;
        
    }

    function buyTicket(film,filmId) {
        const availableTickets = `${film.capacity} - ${film.tickets_sold}`;
        console.log(availableTickets);

        const film = {
            "film_id": "28",
         "number_of_tickets": 5
        };
        const message = alert('Welcome to buying ticket');
        // POST request to purchase the ticket
        fetch(`${url}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Ticket successfully purchased:', data);
        
        
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticketCount: data.ticketCount + 1
            })
        })
        .then(response => response.json())
        .then(updatedFilm => {
            console.log('Film details updated:', updatedFilm);
        
        // Refresh film details display with updated information
        displayFilmDetails(updatedFilm);
        
        // Show success message or perform any other necessary actions
        })
        .catch(error => console.error('Error updating film details:', error));
        
        })
        .catch(error => console.error('Error purchasing ticket:', error));
        }
        
        // Add event listener to "Buy Ticket" button
        const button = document.getElementById('buy-ticket');
        button.addEventListener('click', () => {
        buyTicket(film.id); // Replace `film.id` with the actual ID of the film being purchased 
        });
        buyTicket();

    


