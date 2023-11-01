import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../MoreDataOfNews/Moredata.scss';
import { useEffect } from 'react';
import { useState } from 'react';

function Moredata() {
  const params = useParams();
  const selector = useSelector((state) => state.newsData.allData);
  const data = selector?.results;
  const [oneBlog, setOneBlog] = useState();
  const nevigate = useNavigate();

  useEffect(() => {
    setOneBlog(data?.find((item) => item.article_id === params.id));
  }, [data]);

  return (
    <div className="personalBlog">
      <div className="blog">
        <h3>{oneBlog?.title}</h3>
        {oneBlog?.image_url && (
          <div className="image-div">
            <img src={oneBlog?.image_url} alt="Iamge not available" />
          </div>
        )}

        <h4>Description</h4>
        <p className="dicription">{oneBlog?.description}</p>

        <h4>Content</h4>
        <p>{oneBlog?.content}</p>
        <h4>Language</h4>
        <p>{oneBlog?.language}</p>
      </div>
      <button onClick={() => nevigate('/news')} className="button-primary">
        Back
      </button>
    </div>
  );
}

export default Moredata;
