window.addEventListener("DOMContentLoaded", () => {
  const catalogWindow = document.querySelectorAll(".catalog-window");

  function registerMen(number) {
    cardMen.push(` 
              <article class="catalog-card">
                  <img
                    
                    src= ${perfumesMen[number].image}
                    alt="TOY-BOY"
                    class="catalog-img"
                  />

                   <div class="catalog-content">
                     <p class="ctg-card-title">${perfumesMen[number].name} ${perfumesMen[number].brand} 100ml</p>                  
                                        
                                        
                   </div>
                   <p class="ctg-card-price">$${perfumesMen[number].price}</p> 
              </article>
               
  `);
  }

  const cardMen = [];
  for (let i = 0; i < perfumesMen.length; i++) {
    registerMen(i);
  }

  function publishMen() {
    catalogWindow[0].innerHTML = "";

    for (let i = 0; i < perfumesMen.length; i++) {
      catalogWindow[0].innerHTML += cardMen[i];
    }
    return;
  }

  publishMen();

  function registerWomen(number) {
    cardWomen.push(` 
              <article class="catalog-card">
                  <img
                    
                    src= ${perfumesWomen[number].image}
                    alt="perfume for woman"
                    class="catalog-img"
                  />

                   <div class="catalog-content">
                     <p class="ctg-card-title">${perfumesWomen[number].name} ${perfumesWomen[number].brand} 100ml</p>                  
                                        
                                        
                   </div>
                   <p class="ctg-card-price">$${perfumesWomen[number].price}</p> 
              </article>
               
  `);
  }

  const cardWomen = [];
  for (let i = 0; i < perfumesWomen.length; i++) {
    registerWomen(i);
  }

  function publishWomen() {
    catalogWindow[1].innerHTML = "";

    for (let i = 0; i < perfumesWomen.length; i++) {
      catalogWindow[1].innerHTML += cardWomen[i];
    }
  }

  publishWomen();
});
