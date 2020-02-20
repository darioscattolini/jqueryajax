interface APIResponse {
  type: string,
  value: Joke
}

interface Joke {
  id: number,
  joke: string,
  categories: string[]
}

async function fetchJoke(): Promise<string> {
  const apiUrl = "http://api.icndb.com/jokes/random";
  let response: APIResponse;
  
  await $.ajax({
    url: apiUrl,
    dataType: "json",
    success: (result) => { response = result; }
  });
  
  const joke: string = response.value.joke;
  return joke;
}

async function displayNewJoke() {
  const display = $(".joke");
  let content: string;
  await fetchJoke().then(joke => { content = joke; });
  display.html(content);
}

jQuery(document).ready(() => {
  displayNewJoke();
  const newJokeButton = $("#newJoke");
  newJokeButton.on("click", displayNewJoke);
});