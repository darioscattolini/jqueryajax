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
  const display = <HTMLDivElement>document.querySelector(".joke");
  let content: string;
  await fetchJoke().then(joke => { content = joke; });
  display.innerHTML = content;
}

window.onload = () => {
  displayNewJoke();
  const newJokeButton = <HTMLButtonElement>document.querySelector("#newJoke");
  newJokeButton.onclick = displayNewJoke;
}