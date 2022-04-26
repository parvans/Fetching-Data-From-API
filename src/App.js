import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function App() {
  // const pageSize=5
  // const currentpage=1
  // const start=(currentpage-1)*pageSize
  // const end=(start+pageSize)

  const [query, setQuery] = useState();
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=india"
  );

  console.log("Rendering App....");

  const [currentpage, setCurrentpage] = useState(1);
  const lengthofPage = 5;
  useEffect(() => {
    console.log("Fetching the data...");
    const dataFetch = async () => {
      const dataResult = await axios(url);
      setData(dataResult.data);
    };
    dataFetch();
  }, [url]);
  console.log(data);

  let x = [];
  let tot_pages = data.hits.length;
  let perpage = tot_pages / lengthofPage;

  const buttonChange = (e) => {
    setCurrentpage(Number(e.target.value));
  };
  const Page = () => {
    for (let i = 1; i <= perpage; i++) {
      x.push(i);
    }
    const p = x.slice(0, 4);
    return (
      <div>
        {p.map((item) => (
          <button value={item} onClick={buttonChange}>
            {item}
          </button>
        ))}
      </div>
    );
  };

  const start = (currentpage - 1) * lengthofPage;
  const end = start + lengthofPage;
  const pageItems = data.hits.slice(start, end);

  return (
    <>
      <Container>
        <form
          onSubmit={(e) => {
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Enter Please"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>search</button>
        </form>
        {pageItems.map((item) => (
          <ul>
            <li>
              <a href={item.url}>{item.title} </a>
            </li>
          </ul>
        ))}
        <Page></Page>
      </Container>
    </>
  );
}
