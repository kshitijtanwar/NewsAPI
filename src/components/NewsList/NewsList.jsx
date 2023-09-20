import News from "../News/News";
import "./NewsList.css";

const NewsList = ({ news }) => {
    return (
        <ul className="news-list">
            {news.map((news) => {
                return (
                    <News
                        key={Math.random()}
                        title={news.title}
                        publishDate={news.publishDate}
                        description={news.description}
                        img={news.img}
                    />
                );
            })}
        </ul>
    );
};
export default NewsList;
