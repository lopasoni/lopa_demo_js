import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../takeeaxamination/TakeExam.scss';
import { setToast } from 'redux/slice/tostSlice';
import { error, succes } from 'App';

function TakeExam() {
  const catagoryData = useSelector((state) => state.examslice.catagory);
  const qutions = useSelector((state) => state.examslice.qutions);
  const [allQution, setAllQutions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({}); // Use an object to store selected options for each question
  const [rightAnswer, setRightAnswer] = useState();
  const [avilable, setAvailbale] = useState(true);
  const [wrongAnswer, setwrongAnswer] = useState();

  const dispach = useDispatch();

  const onSelect = (catagory) => {
    const allqutiionFilter = qutions.filter((item) => item.catagory === catagory);
    setAvailbale(allqutiionFilter.length > 0);
    setAllQutions(allqutiionFilter);
    setRightAnswer(false);
  };

  const handleOptionChange = (event, qutionId) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [qutionId]: checked ? value : null
    }));
  };

  const onSubmitData = () => {
    const answertArray = Object.keys(selectedOptions).map((key) => ({
      id: key,
      ans: selectedOptions[key]
    }));

    if (answertArray.length < allQution?.length) {
      dispach(
        setToast({
          type: error,
          msg: 'please fill the all qutions'
        })
      );
      return;
    }

    const FindRight = allQution?.filter((itemA) => {
      return answertArray.some((itemB) => itemA.ans.ansId === itemB.id && itemA.ans.ans === itemB.ans);
    });

    const FindWrong = allQution?.filter((itemA) => {
      return answertArray.some((itemB) => itemA.ans.ansId === itemB.id && itemA.ans.ans !== itemB.ans);
    });
    setRightAnswer(FindRight);
    setwrongAnswer(FindWrong);
    dispach(
      setToast({
        type: succes,
        msg: 'test completed sucessfully'
      })
    );
  };

  const reStartTheexam = () => {
    setSelectedOptions({});
    setRightAnswer(false);
    dispach(
      setToast({
        type: succes,
        msg: 'test restart '
      })
    );
  };

  return (
    <div className="TakeExam">
      <div className="allcatagoy">
        {catagoryData?.map((item, index) => {
          return (
            <>
              <button onClick={() => onSelect(item)} className="button-primary" key={index}>
                {item}
              </button>
            </>
          );
        })}
      </div>

      {avilable && (
        <>
          <h2>Exam qutions</h2>
          <h2> Each qution have 5 marks</h2>
        </>
      )}
      {!avilable && <h1>Qutions avilable soon...</h1>}

      {allQution &&
        allQution.map((item, i) => {
          return (
            <>
              <div key={item.id} className="qutiondiv">
                <p>{`${i + 1}) ${item.qution}`}</p>
                <div className="handleInput">
                  <label>{`[A] ${item.option1}`}</label>
                  <input
                    type="checkbox"
                    value={item.option1}
                    checked={selectedOptions[item.ans.ansId] === item.option1}
                    onChange={(e) => handleOptionChange(e, item.ans.ansId)}
                  />
                </div>

                <div className="handleInput">
                  <label>{`[B] ${item.option2}`}</label>
                  <input
                    type="checkbox"
                    value={item.option2}
                    checked={selectedOptions[item.ans.ansId] === item.option2}
                    onChange={(e) => handleOptionChange(e, item.ans.ansId)}
                  />
                </div>

                <div className="handleInput">
                  <label>{`[C] ${item.option3}`}</label>
                  <input
                    type="checkbox"
                    value={item.option3}
                    checked={selectedOptions[item.ans.ansId] === item.option3}
                    onChange={(e) => handleOptionChange(e, item.ans.ansId)}
                  />
                </div>

                <div className="handleInput">
                  <label>{`[D] ${item.option4}`}</label>
                  <input
                    type="checkbox"
                    value={item.option4}
                    checked={selectedOptions[item.ans.ansId] === item.option4}
                    onChange={(e) => handleOptionChange(e, item.ans.ansId)}
                  />
                </div>
              </div>
            </>
          );
        })}
      {avilable && (
        <>
          <button onClick={onSubmitData} className="button-primary">
            Complate test
          </button>

          <button style={{ marginInline: '20px' }} className="button-primary" onClick={reStartTheexam}>
            Restart Exam
          </button>
        </>
      )}

      {rightAnswer && avilable && <h2>Total marks : {`${rightAnswer.length * 5} out off ${allQution.length * 5} `}</h2>}

      {rightAnswer && avilable && <h2>Right answers</h2>}
      {rightAnswer &&
        avilable &&
        wrongAnswer.map((item, i) => (
          <>
            <div className="wrongQue">
              <p className="que">{`${i + 1}) ${item.qution}`}</p>
              <p className="ans">{`Answer] ${item.ans.ans}`}</p>
            </div>
          </>
        ))}

      <div style={{ paddingBottom: '100px' }}></div>
    </div>
  );
}

export default TakeExam;
