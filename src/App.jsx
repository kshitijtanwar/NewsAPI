import { useCallback, useEffect, useState } from "react";
import "./App.css";
import NewsList from "./components/NewsList/NewsList";
import ReportNews from "./components/ReportNews/ReportNews";

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

    const addNewsHandler = async (news) => {
        fetch("https://reat-http-e398e-default-rtdb.firebaseio.com/news.json?auth=e0wSBh0YvMU4ARSTHs2z16e9jnMzLSM1vbVLQ5rb", {
            method: "POST",
            body: JSON.stringify(news),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                return response;
            })
    };

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
        <>
            <section className="add-report">
                <ReportNews onAddNews={addNewsHandler} />
            </section>
            <div className="content">{content}</div>
        </>
    );
}

export default App;
