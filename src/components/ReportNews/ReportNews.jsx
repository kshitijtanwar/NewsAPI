import React, { useRef } from 'react';

import classes from './ReportNews.module.css';

function ReportNews(props) {
  const titleRef = useRef('');
  const reportRef = useRef('');
  const dateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const news = {
      title: titleRef.current.value,
      report: reportRef.current.value,
      date: dateRef.current.value,
    };

    props.onAddNews(news);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='report-text'>Report</label>
        <textarea rows='5' id='report-text' ref={reportRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Date</label>
        <input type='text' id='date' ref={dateRef} />
      </div>
      <button>Report News</button>
    </form>
  );
}

export default ReportNews;
