import React, {useEffect, useState} from 'react';
import styles from './qa.module.css';
import $ from 'jquery';

const QuestionModal = (props) => {

  const [questionAuth, setQuestionAuth] = useState(true);
  const [nicknameAuth, setNicknameAuth] = useState(true);
  const [emailAuth, setEmailAuth] = useState(true);
  const [submittable, setSubmittable] = useState(true);

  var questionSubmit = true;
  var nicknameSubmit = true;
  var emailSubmit = true;

  // useEffect(() => {
  //   if (questionAuth && nicknameAuth && emailAuth) {
  //     setSubmittable(true);
  //   } else {
  //     setSubmittable(false);
  //   }
  // }, [questionAuth, nicknameAuth, emailAuth])

  var submit = function() {
    if (questionSubmit && nicknameSubmit && emailSubmit) {
      setSubmittable(true);
      console.log('submittable');
    } else {
      setSubmittable(false);
      console.log('not');
    }
  }

  var checkAuth = function(question, nickname, email) {
    if (question.length > 0) {
      setQuestionAuth(true);
      questionSubmit = true;
    } else if (question.length === 0) {
      setQuestionAuth(false);
      questionSubmit = false;
    }

    if (nickname.length > 0) {
      setNicknameAuth(true);
      nicknameSubmit = true;
    } else if (nickname.length === 0) {
      setNicknameAuth(false);
      nicknameSubmit = false;
    }

    if (email.indexOf('@') > 0 && email.indexOf('.com') > 0) {
      setEmailAuth(true);
      emailSubmit = true;
    } else if (email.indexOf('@') < 0 || email.indexOf('.com') < 0) {
      setEmailAuth(false);
      emailSubmit = false;
    }

    submit();
  }

  return(
    <div className={styles.modalcontent}>
      <h2>Ask Your Question</h2>
      <h4>About the {props.productName}</h4>
      <div>
        <div className={styles.modaldiv}>
          {questionAuth
            ? <div>
                <span>Question: *</span><br/>
                <textarea id='question' className={styles.modalquestion} maxLength='1000' placeholder='Write your question here (1000 character max)'/>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Question: *</span><br/>
                <textarea id='question' className={styles.modalquestioncheck} maxLength='1000' placeholder='Write your question here (1000 character max)'/>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          {nicknameAuth
            ? <div>
                <span>Nickname: * </span><br/>
                <input type='text' id='nickname' className={styles.modaluser} placeholder='Example: jackson11!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Nickname: * </span><br/>
                <input type='text' id='nickname' className={styles.modalusercheck} placeholder='Example: jackson11!'/><br/>
                <span>For privacy reasons, do not use your full name or email address</span>
              </div>
          }
        </div>
        <div className={styles.modaldiv}>
          {emailAuth
            ? <div>
                <span>Email: * </span><br/>
                <input type='text' id='email' className={styles.modaluser} placeholder='Example: jackson11@gmail.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
            : <div>
                <span className={styles.modaltitlecheck}>Email: * </span><br/>
                <input type='text' id='email' className={styles.modalusercheck} placeholder='Example: jackson11@gmail.com'/><br/>
                <span>For authentication purposes, you will not be emailed</span>
              </div>
          }
        </div>
        <div>
          {submittable
            ? null
            : <p className={styles.submiterror}>Please check your entries</p>
          }
        </div>
        <div>
          <button className={styles.questionsubmit} onClick={() => {checkAuth($('#question').val(), $('#nickname').val(), $('#email').val())}}>Submit</button>
        </div>
      </div>
    </div>
  )
};

export default QuestionModal;