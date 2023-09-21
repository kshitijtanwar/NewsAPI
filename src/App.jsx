import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NewsList from "./components/NewsList/NewsList";

function App() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchNewsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        fetch(
            "https://newsapi.org/v2/top-headlines?country=in&apiKey=52d12c5185e4497ba95d820df1a1454e"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const transformedNews = data.articles.map((news) => {
                    return {
                        id: Math.random(),
                        description: news.description,
                        title: news.title,
                        publishDate: news.publishedAt,
                        img: news.urlToImage,
                    };
                });
                setNews(transformedNews);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchNewsHandler();
    }, [fetchNewsHandler]);

    let content = <p></p>;
    if (news.length > 0) {
        content = <NewsList news={news} />;
    }
    if (isLoading) {
        content = <p>Please wait loading...</p>;
    }
    if (error) {
        content = <p>Something went wrong...</p>;
    }

    return (
        <div className="content">
            <button onClick={fetchNewsHandler}>Fetch News</button>
            {content}
        </div>
    );
}

export default App;
