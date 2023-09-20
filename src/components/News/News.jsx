import "./News.css";
import placeholder from "../../assets/placeholder-news.jpg"
const News = ({img, title, id, publishDate, description }) => {
    return (
        <div className="news-card" key={id}>
            <div className="image-sec">
                <img src={img?img:placeholder} alt="not found" />
            </div>
            <div>
            <h3>{title}</h3>
            <span>{publishDate}</span>
            <p>{description}</p>
            </div>
        </div>
    );
};
export default News;
