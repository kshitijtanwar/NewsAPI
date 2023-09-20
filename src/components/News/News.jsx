import "./News.css";
const News = ({img, title, id, publishDate, description }) => {
    return (
        <div className="news-card" key={id}>
            <div className="image-sec">
                <img src={img} alt="not found" />
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
