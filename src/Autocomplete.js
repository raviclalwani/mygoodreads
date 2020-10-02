import React, {  useEffect } from "react";
var useState = React.useState;

export default function Autocomplete() {

    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState([]);
    const [favBooks, setFavBooks] = useState([]);
    async function requestBooks() {
      if (bookTypeToSearch) {
        try {
          await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTypeToSearch}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            }
          }).then(response => response.json())
            .then(response => {
              let data = []
              // response.items.map(items => {
              //   data.push(items.volumeInfo)
              // })
              setAllAvailableBooks(response.items);
            });
        } catch (exception) {
          setAllAvailableBooks([]);

        }
      }
    }



    useEffect(() => {
      async function getAllBooks() {
        await requestBooks();
      }
      getAllBooks();
    }, [bookTypeToSearch]);
    
    return (
      <>
        <div className="book--container">
          <div className="search-params">
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateBookTypeToSearch(bookType)
                }}
              >
                <input
                  className="full-width"
                  autoFocus
                  name="gsearch"
                  type="search"
                  value={bookType}
                  placeholder="Search for books to add to your reading list and press Enter"
                  onChange={e => updateBookType(e.target.value)}
                />
              </form>
              {!bookType && (
                <div className="empty">
                  <p>
                    Try searching for a topic, for example
                                        <a onClick={() => {
                      updateBookType("Javascript");
                    }}
                    >
                      {" "}
                                            "Javascript"
                                        </a>
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 d-flex flex-row flex-wrap">

          <div className="col-lg-10 col-md-8">
            <div className="d-flex flex-row flex-wrap">
                {allAvailableBooks.length > 0 && (
                  allAvailableBooks.map((items) => {
                    { console.log(favBooks)}
                    return (
                      <div className="card col-lg-3 col-md-4 col-xs-12 col-sm-6 m-3">
                        <img className="card-img-top" src={items.volumeInfo.imageLinks.smallThumbnail} alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title line-clamp-1" title={items.volumeInfo.title}>{items.volumeInfo.title}</h5>
                          <p className="card-text line-clamp" title={items.volumeInfo.description}>{items.volumeInfo.description}</p>
                        </div>
                        <div class="card-footer">
                          <small class="text-muted">
                            {items.volumeInfo.authors[0]}
                            </small>
                        </div>
                        <div class="card-footer">
                          <button class="btn btn-sm pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-primary" type="button" onClick={() => setFavBooks([...favBooks, items.volumeInfo])}><i class="material-icons pmd-sm">Add To Fav</i></button>
                        </div>
                      </div>)}
                    )
                    )}
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      My Wishlist
                    </button>
                  </h2>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="card-body">
                    {favBooks.length > 0 && (
                      favBooks.map((items) => {
                        { console.log(items.volumeInfo) }
                        return (
                          <>
                          <small>{items.title}</small>
                          <hr/>
                          </>
                      )
                    }
                  ))}
                 </div>
                </div>
              </div>
            </div>       
          </div>
        </div>
      </>
    );
  };

