import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../newsapp/News.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, searchdata, setPrviosPageNum } from '../../../redux/slice/newsData';

function News() {
  const neviget = useNavigate();
  const dispach = useDispatch();
  const selector = useSelector((state) => state.newsData.allData);
  const curruntPage = useSelector((state) => state.newsData.curruntPage);
  const [inputdata, setInputData] = useState('');
  const [btn, buttonOf] = useState(false);
  const [hidePagination, setHidePagination] = useState();
  const data = selector?.results;

  useEffect(() => {
    dispach(fetchNews());
  }, []);

  const handleSubmit = () => {
    dispach(searchdata(inputdata));
  };

  const goToNextPage = (nextpage) => {
    buttonOf(true);
    dispach(fetchNews(nextpage));
    dispach(setPrviosPageNum({ id: nextpage }));
  };

  const setPreviosPage = () => {
    const tryToFindCurrt = selector?.nextPage;
    const nextpagedata = curruntPage?.find((item) => item.curruntId === tryToFindCurrt);
    const currubtPageIndex = curruntPage[nextpagedata?.index - 2]?.index;
    if (currubtPageIndex === 2) {
      buttonOf(false);
    }
    if (currubtPageIndex === undefined) {
      const previospage = [...curruntPage];
      const id = previospage[previospage.length - 2].curruntId;
      dispach(fetchNews(id));
    } else {
      const id = curruntPage[currubtPageIndex - 2].curruntId;
      dispach(fetchNews(id));
    }
  };

  return (
    <div className="BlogDive">
      <div className="seach">
        <input
          type="text"
          placeholder="Search your news"
          onChange={(e) => {
            if (e.target.value === '') {
              setHidePagination(false);
              dispach(fetchNews());
            } else {
              setHidePagination(true);
              setInputData(e.target.value);
            }
          }}
        />
        <button className="button-primary" onClick={handleSubmit}>
          Search
        </button>
      </div>

      <div className="paginationButton">
        {btn && !hidePagination && (
          <button
            className="button-primary"
            onClick={() => {
              setPreviosPage();
            }}
          >
            Previous page
          </button>
        )}
        {selector?.nextPage && !hidePagination && (
          <button
            onClick={() => {
              goToNextPage(selector.nextPage);
            }}
            className="button-primary"
          >
            Next page
          </button>
        )}
      </div>
      <h1>Blogs</h1>

      <div className="makeFlex">
        {data?.map((item) => {
          return (
            <div key={item.article_id} className="blog">
              {item.image_url && (
                <div className="image-div">
                  <img src={item.image_url} alt="Iamge not available" />
                </div>
              )}
              <h3>{item.title}</h3>
              <p className="dicription">{item.description}</p>
              <button
                onClick={() => {
                  neviget(`/news/${item.article_id}`);
                  // neviget('/news/id');
                }}
                className="button-secondary"
              >
                Read more..
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default News;
