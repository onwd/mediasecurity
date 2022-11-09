import { useEffect, useState } from 'react';
import styles from './app.module.scss';
import { Background } from './components/background/background';
import { Button } from './components/button/button';
import { Content } from './components/content/content';
import { ContentButtons } from './components/content/content-buttons';
import { Robot } from './components/robot/robot';
import Typist from 'react-typist-component';
import { Step } from './enums/step';
import { AnswerButton } from './components/answer/answer-button';

const INITIAL_STEP = Step.START;
const TYPING_DELAY = 50;

const U = new SpeechSynthesisUtterance();
let voice: SpeechSynthesisVoice | null = null;

// let voices = speechSynthesis.getVoices();
// let voice = findRussianVoice(voices);

speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();

  console.log(voices);

  voice = findRussianVoice(voices);

  if (voice) {
    U.onstart = () => console.log('Started');
    U.onend = () => console.log('Finished');
    U.onerror = (err) => console.error(err);
    U.onpause = () => console.log('Paused');
    U.onresume = () => console.log('Resumed');
  }
};

async function speak(text: string) {
  if (voice) {
    U.text = text;
    U.voice = voice;
    U.lang = voice.lang;
    U.volume = 1;
    U.rate = 1;
    U.pitch = 0.7;
    speechSynthesis.speak(U);
  }

  console.log('Speak', text);

  await new Promise((resolve) => setTimeout(resolve, text.length * TYPING_DELAY));
}

function findRussianVoice(voices: Array<SpeechSynthesisVoice>) {
  return voices.find((voice) => voice.name === 'Google русский') || null;
}

export function App() {
  const [isTalking, setIsTalking] = useState<boolean>(true);
  const [step, setStep] = useState<Step>(INITIAL_STEP);
  const [isCopyrightInformationVisible, setIsCopyrightInformationVisible] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.search.includes('qr')) {
      setStep(Step.QR_CODE_SCANNED);
    }
  }, []);

  const onTypingDone = () => {
    setIsTalking(false);
  };

  const goToNextStep = () => {
    setStep((step) => step + 1);
    setIsTalking(true);

    (async () => {
      const nextStep = step + 1;

      if (nextStep === Step.GREETING) {
        await speak('Здравствуйте!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Меня зовут Пимо.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Я робот.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Я умею чинить компьютеры и очень хорошо разбираюсь в правилах пользования Интернетом!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Я очень люблю гостей и приглашаю вас к себе, но прежде чем посетить мой дом, мы с вами должны вспомнить правила поведения и поделиться знаниями о безопасном Интернете друг с другом.');
      }

      if (nextStep === Step.INTERNET) {
        await speak('Я живу в мире под названием Интернет.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('В нем очень много интересного и веселого.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Он похож на паутину.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Вы когда-нибудь видели как пауки плетут свою паутину?');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Вот и Интернет чем-то схож с ней.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Интернет – это всемирная сеть, в которой миллионы компьютеров и смартфонов связаны между собой.');
      }

      if (nextStep === Step.QUESTION_INTERNET) {
        await speak('Давайте закрепим знания!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('На что похож Интернет?');
      }

      if (nextStep === Step.SITES) {
        await speak('В Интернете мы можем с вами найти много разной информации: ');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('смотреть мультфильмы');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('читать книги');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('играть в игры');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('получать новые знания и находить ответы на свои вопросы');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Эта информация находится на сайтах.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Сайт – это Интернет-ресурс, состоящий из одной или нескольких информационных страниц.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Есть полезные сайты, а есть опасные.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Если вы зашли на сайт и появилось окно красного цвета, нужно сразу позвать родителей и не нажимать на него!');
      }

      if (nextStep === Step.QUESTION_SITES) {
        await speak('Давайте решим задачу:');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Вы заходите на сайт и появляется красное окошко на весь экран.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await speak('Что вы будете делать?');
      }

      if (nextStep === Step.ACCOUNT) {
        await speak('В Интернете на многих сайтах нужно создавать аккаунт');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 150));
        await speak('Это ваш личный профиль, который позволяет пользоваться сайтом от вашего имени.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('У каждого аккаунта есть пароль');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 150));
        await speak('Секретная информация, которую знаете только вы.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Не стоит использовать слишком простые пароли для своих аккаунтов в Интернете, потому что их очень легко взломать.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Придумайте такой пароль, который вы легко сможете запомнить.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Никому не сообщайте данные для входа в свой аккаунт.');
      }

      if (nextStep === Step.QUESTION_ACCOUNT_1) {
        await speak('У Коли день рождения десятого октября 2010 года.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Он решил создать аккаунт в социальной сети.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Помогите Коле выбрать безопасный пароль:');
      }

      if (nextStep === Step.QUESTION_ACCOUNT_2) {
        await speak('Саша создал аккаунт в компьютерной игре.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Новый знакомый Саши попросил данные от его аккаунта, чтобы поиграть в игру.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Что следует сделать Саше?');
      }

      if (nextStep === Step.COMMUNICATION) {
        await speak('А еще в Интернете можно общаться, но будьте осторожны!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Вам могут написать совершенно незнакомые люди.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('В таких ситуациях стоит насторожиться!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Не рассказывайте никому информацию о себе и своей семье');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('например, адрес');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('номер телефона');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('фотографии');
        await new Promise((resolve) => setTimeout(resolve, 100));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Самое главное');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 150));
        await speak('если незнакомец приглашает вас на встречу в реальной жизни, то обязательно сообщите об этом родителям и ни в коем случае не идите на эту встречу в одиночку, потому что он может оказаться кем угодно и даже причинить вам вред.');
      }

      if (nextStep === Step.QUESTION_COMMUNICATION_1) {
        await speak('Новый друг Андрея, с которым он вчера познакомился в Интернете, попросил срочно сообщить такую информацию:');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('номер телефона');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('домашний адрес');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('и кем работают родители Андрея.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Что должен сделать Андрей в этом случае?');
      }

      if (nextStep === Step.QUESTION_COMMUNICATION_2) {
        await speak('Вы получили электронное письмо:');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Дорогой друг! Мне нравятся твои комментарии.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Видно, что ты умный и добрый человек.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Давай встретимся сегодня в парке в 5 часов вечера.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('У меня в руках будет игрушечный медвежонок.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('До встречи!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Никому не сообщай о встрече!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Это наш маленький секрет');
        await new Promise((resolve) => setTimeout(resolve, 100));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Что вы будете делать?');
      }

      if (nextStep === Step.BULLING) {
        await speak('При общении в Интернете вы можете встретиться с людьми, которые будут агрессивны к вам и могут оскорблять вас.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Это называется кибербуллинг.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Вам не стоит общаться с такими людьми и тем более отвечать им тем же.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Лучший способ испортить хулигану его выходку – отвечать ему полным игнорированием.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Если у вас есть информация, что кто-то оскорбляет ваших друзей или знакомых, то сообщите об этом классному руководителю или школьному психологу – необходимо принять меры по защите ребенка.');
      }

      if (nextStep === Step.QUESTION_BULLING) {
        await speak('Никита высказал свое мнение в комментариях.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Один незнакомец был не согласен с мнением Никиты и начал агрессивно доказывать свою точку зрения, оскорбляя Никиту.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Что нужно сделать Никите?');
      }

      if (nextStep === Step.LOGOUT) {
        await speak('Иногда бывают такие ситуации, когда вам придется использовать Интернет с чужого компьютера или смартфона.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Не забывайте выходить из своего аккаунта в социальной сети, почты и на других сайтах после завершения работы.');
      }

      if (nextStep === Step.QUESTION_LOGOUT) {
        await speak('Миша попросил у своего знакомого телефон, чтобы прочитать сообщения в почте.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('После работы, он забыл выйти из аккаунта.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Что может произойти с аккаунтом Миши?');
      }

      if (nextStep === Step.VIRUSES) {
        await speak('Как и в любом обществе, в Интернете есть свои опасности, и одна из этих опасностей – вирусы.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Они могут нанести огромный вред вашему компьютеру или смартфону, раскрыть вашу личную информацию');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('например, фотографии');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('пароль от почты');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('данные банковских карт');
        await new Promise((resolve) => setTimeout(resolve, 100));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Никогда не скачивайте и не запускайте файлы из сообщений, полученных от подозрительных и неизвестных вам людей.');
      }

      if (nextStep === Step.QUESTION_VIRUSES) {
        await speak('Антон создал себе электронный ящик.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Теперь он может обмениваться сообщениями со своими друзьями.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Сегодня на адрес его электронной почты пришло сообщение, содержащее файл с игрой от незнакомца.');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Как поступить Антону?');
      }

      if (nextStep === Step.QR_CODES) {
        await speak('В нашем мире существует много интересных информационных технологий. И одна из них – это QR-код.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('QR-код это рисунок, который можно отсканировать с помощью смартфона, чтобы быстро получить доступ к информации.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('С помощью QR-кода можно:');
        await new Promise((resolve) => setTimeout(resolve, 1300));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('посмотреть рекламу');
        await new Promise((resolve) => setTimeout(resolve, 1300));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('оплатить товары в магазине');
        await new Promise((resolve) => setTimeout(resolve, 1300));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('открыть сайт');
        await new Promise((resolve) => setTimeout(resolve, 1300));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('и другое');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Но будьте осторожны!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('В QR-коде может оказаться и небезопасная для вас информация!');
      }

      if (nextStep === Step.QUESTION_QR_CODES) {
        await speak('Коля навел камеру смартфона на QR-код, отсканировал его и перешел по ссылке внутри, после чего открылся сайт с красным окошком.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Как поступить Коле?');
      }

      if (nextStep === Step.SCAN_QR_CODE) {
        await speak('Ребята, давайте потренируемся использовать QR-код.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Доставайте свои смартфоны, наводите на данный QR-код, нажимайте на всплывающую ссылку и посмотрите, что у вас получится!');
      }

      if (nextStep === Step.QR_CODE_SCANNED) {
        await speak('Молодцы!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('Ребята, я вас поздравляю!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Вы прошли все мои задания и научились правильно пользоваться Интернетом.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 50));
        await speak('Я надеюсь, что вы будете вспоминать правила и тогда время проведенное в Интернете, будет приносить вам радость, знания и хорошее настроение!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Promise((resolve) => setTimeout(resolve, 100));
        await speak('До свидания, до скорых встреч!');
      }
    })();
  };

  const showCopyrightInformation = () => {
    setIsCopyrightInformationVisible(true);
  };

  const hideCopyrightInformation = () => {
    setIsCopyrightInformationVisible(false);
  };

  const renderContent = () => {
    if (step === Step.START) {
      return (
        <>
          <Typist.Paste>
            <div className={styles['start']}>
              <span className={styles['start_school']}>МБОУ «С(К)ОШ №60 г. Челябинска»</span><br/>
              <br/>
              <br/>
              <br/>
              <span className={styles['start_title']}>Интерактивная игра<br/>«Я в медиабезопасности»</span>
              <br/>
              <br/>
              <br/>
              <ContentButtons>
                <Button onClick={goToNextStep}>
                  Начать
                </Button>
              </ContentButtons>
              <br/>
              <br/>
              <br/>
              Авторы:<br/>
              Усенко Анна Сергеевна<br/>
              Патракова Ольга Александровна
            </div>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.GREETING) {
      return (
        <>
          Здравствуйте!<Typist.Delay ms={1000} /> Меня зовут <span className={styles['highlight']}>Пимо</span>.<Typist.Delay ms={1000} /> Я робот.<Typist.Delay ms={1000} /><br/>
          <br/>
          Я умею чинить компьютеры и очень хорошо разбираюсь в правилах пользования Интернетом!<Typist.Delay ms={1500} /><br/>
          <br/>
          Я очень люблю гостей и приглашаю вас к себе,<Typist.Delay ms={300} /> но прежде чем посетить мой дом, мы с вами должны вспомнить правила поведения и поделиться знаниями о безопасном Интернете друг с другом.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.INTERNET) {
      return (
        <>
          Я живу в мире под названием <span className={styles['highlight']}>Интернет</span>.<Typist.Delay ms={1000} /><br/>
          В нем очень много интересного и веселого.<Typist.Delay ms={1000} /><br/>
          <br/>
          Он похож на паутину.<Typist.Delay ms={1000} /> Вы когда-нибудь видели как пауки плетут свою паутину?<Typist.Delay ms={1000} /> Вот и Интернет чем-то схож с ней.<Typist.Delay ms={1000} /><br/>
          <br/>
          Интернет – это всемирная сеть, в которой миллионы компьютеров и смартфонов связаны между собой.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_INTERNET) {
      return (
        <>
          Давайте закрепим знания!<Typist.Delay ms={1000} /><br/>
          <br/>
          На что похож Интернет?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                <svg style={{ width: 'calc(100vw / 15)' }} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M124.44 84.1261C119.508 82.2687 116.077 80.7793 114.152 79.6438C110.66 77.7087 108.356 73.8894 107.245 68.1788C106.324 63.4344 106.941 58.9854 109.101 54.856C111.258 50.7162 114.609 47.9035 119.145 46.4221L118.948 45.4038C122.356 44.3228 125.262 43.36 127.665 42.5129V41.9388L112.152 46.1195C111.493 46.3492 109.957 46.1962 107.544 45.6616C103.966 44.8494 100.754 42.9355 97.9101 39.9186C95.0617 36.9106 93.2819 33.5633 92.5661 29.8828C91.6602 25.2306 92.4184 21.1205 94.8372 17.5313L94.1704 17.2099C96.0833 13.9576 97.7205 11.1572 99.0824 8.80423H98.1313C96.3407 11.5223 94.8701 13.8005 93.7172 15.6386C92.1553 17.952 90.9953 19.7365 90.2358 20.9896C88.3614 23.2607 85.2527 24.8231 80.8946 25.6711C72.6654 27.272 65.7958 25.0391 60.3002 18.9675C58.8569 17.2461 57.9995 15.952 57.7346 15.0955C56.7468 10.2927 55.9045 6.41176 55.2118 3.45317H54.5233C54.9478 6.52799 55.3393 8.98305 55.6974 10.8193L54.9699 10.9591C55.8122 16.3256 54.7553 21.2085 51.7906 25.6009C48.8249 29.9929 44.6795 32.712 39.3567 33.7468C34.2245 34.7449 29.4329 33.6146 24.9826 30.3595L24.9534 30.2127L24.5784 30.5906C21.0278 28.04 18.0814 25.9435 15.7412 24.3026H14.6626C16.9953 26.1336 19.3435 27.9614 21.7064 29.7906C26.9261 33.9002 29.9238 37.9449 30.6955 41.9125C31.7299 47.2372 30.6711 52.2635 27.5256 56.9981C24.3769 61.7304 20.1854 64.6075 14.9548 65.6231C14.1831 65.7746 13.3487 65.8823 12.4593 65.9553L12.1148 65.7219C11.9873 66.1463 11.8842 66.3713 11.7882 66.3906L0 67.9953V68.9788C4.22635 68.5666 7.74729 68.1831 10.5619 67.8315L15.8758 67.2551C19.8791 67.6772 23.2753 69.3816 26.064 72.3534C28.8499 75.3289 30.6395 78.8522 31.4296 82.9195C32.5412 88.6296 31.8207 93.1896 29.2706 96.6038C27.1887 98.8188 25.5534 100.489 24.3656 101.623C22.128 103.725 19.9144 105.818 17.7327 107.906H19.7365C22.1233 105.612 24.1402 103.627 25.7873 101.951L25.9633 102.069C28.8946 99.5882 31.9633 98.0405 35.1576 97.4184C40.4786 96.3845 45.4358 97.448 50.0235 100.63C54.6127 103.809 57.424 108.061 58.4584 113.384C58.7788 115.031 58.6842 118.166 58.1802 122.784L57.9746 124.547H58.6494C59.1567 121.303 59.5412 118.6 59.8028 116.439C61.872 109.505 66.8306 105.274 74.6692 103.75C79.5125 102.808 83.6678 103.261 87.1412 105.093C89.7247 106.494 92.336 109.06 94.9666 112.769C95.8005 114.014 96.6273 115.253 97.4461 116.486H98.4584L97.9115 115.512C95.4574 111.167 94.1294 108.458 93.9219 107.396C92.8297 101.777 93.712 96.6071 96.5591 91.8842C99.4085 87.1633 103.592 84.2616 109.11 83.1887C112.109 82.6052 115.537 82.8946 119.379 84.0546L119.674 83.2409C122.968 84.4461 125.744 85.4536 128 86.264V85.5049C126.908 85.0673 125.72 84.608 124.44 84.1261ZM111.97 47.5129C111.584 47.5878 112.242 47.6118 113.942 47.5821C106.876 52.5722 104.199 59.4781 105.909 68.2805C106.645 72.064 108.3 75.4094 110.876 78.32L105.984 76.4103L105.928 76.1195C100.832 74.1972 97.7671 70.5722 96.7304 65.2471C94.8857 55.7553 99.9661 49.8466 111.97 47.5129ZM41.9162 75.6009C40.9205 70.4734 38.1911 67.0315 33.728 65.2852C40.9779 63.7788 45.216 66.2212 46.4574 72.6089C47.1732 76.2904 46.1351 79.4555 43.3332 82.1092L43.5346 82.3699L41.0005 84.8263C42.1962 81.6776 42.4998 78.6019 41.9162 75.6009ZM41.5435 47.3388C41.3181 46.1746 40.9398 44.9939 40.4033 43.7939C43.5666 46.0889 45.3901 48.5002 45.8795 51.0202C46.4631 54.0169 45.7995 56.7854 43.8744 59.3195C41.9572 61.8536 39.4998 63.1638 36.5002 63.2433L36.4113 63.56L33.3059 63.8649C36.4061 62.2532 38.7242 59.9435 40.2466 56.9341C41.7689 53.9271 42.2028 50.7256 41.5435 47.3388ZM84.6894 37.4438C85.3473 40.8329 86.9341 43.6894 89.4475 46.0141C91.9595 48.3374 94.9266 49.7689 98.3454 50.3144L89.9445 52.8522C87.9511 53.4386 85.9407 52.7943 83.9247 50.9313C81.9002 49.0626 80.6927 47.1129 80.2951 45.0715C79.8249 42.656 80.2273 40.3242 81.4974 38.0654L81.4682 37.9172L84.4508 33.1172C84.2885 34.3553 84.3685 35.7981 84.6894 37.4438ZM85.9431 64.0235C86.3595 66.1623 87.2038 67.9539 88.4932 69.4113L82.6452 67.2268L82.9374 66.4188L82.792 66.4471C80.8424 65.7223 79.6809 64.3896 79.3049 62.4551C78.552 58.5826 81.464 56.0033 88.0475 54.7233L88.632 54.6089C86.1224 57.2118 85.2287 60.3511 85.9431 64.0235ZM54.9906 67.6325C54.576 65.5031 53.6174 63.9336 52.1148 62.9195L57.0805 62.1026L57.3384 62.6569L57.5101 62.7751C58.7887 62.6207 59.576 63.3266 59.8795 64.8781C60.0292 65.6513 59.4414 66.7666 58.1219 68.232C56.9915 69.1553 55.9148 70.0682 54.8842 70.9708C55.1605 69.8136 55.1981 68.7002 54.9906 67.6325ZM47.3059 72.2969C46.5708 68.5181 44.5944 65.8381 41.3694 64.2541L41.8052 64.1703C44.9054 63.5675 47.6974 63.2268 50.1934 63.1407C52.4353 64.3134 53.752 65.9153 54.1473 67.9473C54.504 69.7859 53.6993 71.8527 51.7346 74.1431C50.0376 75.7835 48.3576 77.4635 46.6842 79.1991C47.5257 76.8245 47.7379 74.5233 47.3059 72.2969ZM47.1887 50.7647C47.0946 50.2823 46.8287 49.4268 46.3878 48.2071C49.2009 50.2696 51.3078 51.8198 52.7176 52.8522L53.1162 54.1322C53.4348 55.7788 53.1407 57.3459 52.2226 58.8296C51.3073 60.3144 50.0696 61.2042 48.5219 61.5054L47.7694 61.5002L47.7642 62.2555L41.84 62.8047C46.4264 60.0075 48.2038 55.9859 47.1887 50.7647ZM78.1139 62.5365C78.3784 63.8922 78.9623 65.0856 79.8659 66.1143L79.7191 66.1426C78.3304 65.7092 76.9765 65.2245 75.6649 64.6725C73.9082 63.9082 72.9572 63.1383 72.8075 62.3652C72.5431 61.0056 73.0136 60.0645 74.2141 59.528C74.1958 59.4296 74.1675 59.2913 74.1289 59.0889L74.0438 58.6565L79.2151 57.3459C78.1035 58.8645 77.7374 60.5976 78.1139 62.5365ZM66.9751 61.8419L72.0984 64.1553C71.048 64.4635 70.2842 65.1656 69.7972 66.2607L66.9751 61.8419ZM69.4979 67.8296C68.5511 67.6104 67.7868 67.5553 67.2033 67.6701C66.3355 67.8367 65.6532 68.2245 65.1694 68.8245C65.4132 65.9633 65.5332 63.4734 65.5261 61.3689L66.0226 60.8165L69.4405 67.5332L69.4979 67.8296ZM71.4409 62.3256L71.7275 63.0254C69.4838 62.3539 67.8249 61.8268 66.7431 61.4268L66.1374 60.6419C67.6127 60.4569 69.3449 60.072 71.3398 59.4819L72.1224 59.6315C71.4974 60.5567 71.272 61.4532 71.4409 62.3256ZM67.1002 60.1544L69.2071 57.0376C69.7779 57.9313 70.256 58.5388 70.6174 58.8645L67.1002 60.1544ZM71.2936 57.6809C70.7925 57.1751 70.5035 56.7313 70.4282 56.3407C70.2965 55.6654 70.7012 54.6334 71.6362 53.2447C72.2598 52.3162 72.9355 51.3859 73.6532 50.44C73.7035 51.7379 74.2922 52.9511 75.4155 54.0889C76.5412 55.232 77.7322 55.9266 78.9901 56.184L72.5953 58.1821C72.2296 58.3586 71.7911 58.1892 71.2936 57.6809ZM70.0334 54.3087L69.6856 54.0753C69.1026 54.696 68.52 55.0555 67.9402 55.1689C66.2922 55.4899 65.3398 54.9736 65.0753 53.6151L64.1172 47.92C66.4701 49.6753 68.8546 50.3219 71.2744 49.8513C71.3708 49.832 71.6522 49.7233 72.12 49.5327C72.4113 49.4772 72.6513 49.4292 72.848 49.392H72.8485L70.0334 54.3087ZM65.8536 59.9435C65.9929 59.6165 65.8918 58.3318 65.5558 56.0852C66.4612 56.6132 67.4005 56.7812 68.3652 56.5925L68.7746 56.3647C67.9172 58.1393 67.2607 59.4235 66.8075 60.2118L65.3256 61.104L65.1228 60.8391L65.4113 60.7835L64.8047 60.7525C63.2424 59.4513 62.0471 58.4753 61.2221 57.8334C62.7125 57.7459 63.8786 57.0165 64.7153 55.6438C65.2875 57.5435 65.6654 58.9783 65.8536 59.9435ZM64.1953 60.72L60.3336 61.0165C60.7835 60.232 60.9816 59.4358 60.928 58.6471L64.1953 60.72ZM64.5459 60.9515L65.0664 61.3068L60.9784 65.1167C60.8127 63.7388 60.2659 62.7402 59.3412 62.1158L59.8649 61.7134C61.1647 61.6626 62.7191 61.408 64.5459 60.9515ZM65.4118 61.5402L64.3017 68.2315C63.6141 66.7619 62.4489 66.1826 60.7958 66.5031L65.4118 61.5402ZM64.896 70.9078C65.0579 69.4202 65.7685 68.5548 67.0273 68.3092C68.2866 68.0654 69.3299 68.5167 70.1567 69.6551L70.5609 69.4301L72.9449 73.9416C71.5751 73.1021 70.0202 72.8513 68.2748 73.1906C66.8268 73.4725 65.5967 74.1115 64.5816 75.1158C64.6311 73.8024 64.7337 72.4 64.896 70.9078ZM70.4833 67.4847C70.5515 66.2673 71.2555 65.5294 72.6151 65.264C73.12 65.264 73.5835 65.3233 74.0085 65.4419L74.0687 64.9816L77.8598 66.6551C76.8122 66.9609 75.8353 67.7496 74.9308 69.0339C74.0254 70.3172 73.5784 71.5073 73.5906 72.607L70.4833 67.4847ZM77.8555 54.2216C76.2791 53.3755 75.336 52.1242 75.0151 50.4786C74.7892 49.3115 75.1652 47.8847 76.1421 46.1892C77.0009 44.9148 77.8513 43.5911 78.6885 42.2263C78.6795 43.2325 78.7445 44.0739 78.8767 44.7529C79.7991 49.4974 82.296 52.5299 86.3727 53.8456L82.8254 54.9859L82.7675 54.696C81.0645 55.2287 79.4273 55.0711 77.8555 54.2216ZM74.8042 46.2955L74.3096 46.0932C73.8607 47.3831 72.7647 48.2024 71.0217 48.5398C66.6654 49.3882 64.0424 47.5336 63.1581 42.9854L62.6546 39.6184C65.7111 42.9369 69.7609 44.1162 74.7962 43.1374C75.0828 43.08 75.8791 42.7736 77.1784 42.2216L74.8042 46.2955ZM62.6715 47.4508L62.9322 47.2499L64.1468 53.4965L63.7129 53.5802C63.8184 55.1666 63.0984 56.1092 61.5501 56.4104C60.8725 56.5426 60.1934 56.4263 59.5209 56.0513L59.2842 56.3981L53.9407 52.1623C54.7887 52.3991 55.7464 52.4188 56.8108 52.2113C59.7181 51.6475 61.6696 50.0569 62.6715 47.4508ZM54.4518 54.0235C56.5534 55.5186 58.1233 56.6254 59.1689 57.3266L59.6795 58.4311C59.7736 58.9172 59.6612 59.4903 59.3374 60.1558C59.0146 60.8235 58.6602 61.1901 58.2739 61.2654L50.5788 62.0099C51.8602 61.3595 52.9172 60.2259 53.7614 58.608C54.6024 56.9863 54.8292 55.4555 54.4518 54.0235ZM59.4268 67.9783L59.7468 68.0682C60.0762 67.7031 60.4819 67.4701 60.9661 67.3774C62.3209 67.1129 63.3816 67.6607 64.1553 69.0212L63.2089 76.5835C63.1224 75.0988 62.2852 73.7779 60.7082 72.6278C59.128 71.4786 57.6692 71.0814 56.3336 71.4438L56.04 71.4993L59.4268 67.9783ZM64.4616 76.0442C65.6306 74.8089 66.8391 74.0687 68.0998 73.8235C70.6193 73.3341 72.8381 74.4155 74.7572 77.0569C75.0268 77.4038 76.3473 79.8122 78.7271 84.2696C76.0598 82.4758 73.2311 81.8753 70.2301 82.4584C67.4221 83.0033 65.1129 84.3059 63.3031 86.3638C63.8301 81.8442 64.2184 78.4071 64.4616 76.0442ZM74.6569 74.2075C74.3755 72.7609 74.6969 71.3167 75.6264 69.8758C76.5544 68.4438 77.7421 67.5826 79.192 67.3007C79.5021 67.344 79.7068 67.3492 79.7995 67.3313C84.0485 69.0132 87.2136 70.3148 89.2974 71.2155C86.3732 71.6805 83.9628 72.8598 82.0682 74.7285C80.1727 76.6061 79.1576 79.016 79.0254 81.9548C76.0762 76.5967 74.6202 74.0193 74.6569 74.2075ZM79.2268 38.8038C77.8452 40.4809 75.9939 41.5487 73.6682 42C71.0555 42.5087 68.5332 42.0692 66.0993 40.6762C63.6692 39.2936 62.2014 37.2922 61.6946 34.6795L60.6753 29.4475C64.8264 34.7732 70.3896 36.752 77.3595 35.3967C79.2005 35.0376 80.9746 34.3463 82.6828 33.3096C80.4569 36.8583 79.3049 38.6927 79.2268 38.8038ZM61.3181 39.7294L62.1068 43.7901L61.8198 43.8461C62.2635 47.6795 60.4969 49.9816 56.5261 50.7539C54.5896 51.1308 53.1176 50.7704 52.0951 49.6569L51.4805 50.3779L48.1304 47.8701C49.6395 47.8753 50.8292 47.7972 51.7007 47.6278C56.5416 46.6856 59.752 44.0494 61.3181 39.7294ZM58.1435 42.3779C56.1944 44.5167 53.9186 45.84 51.3031 46.3487C48.9812 46.7995 46.9732 46.5802 45.2993 45.7045C45.0885 45.6452 43.4475 44.4579 40.3835 42.1393C42.2786 42.5765 44.2875 42.5831 46.4216 42.1685C53.2941 40.8311 57.5732 36.736 59.2555 29.8786L60.3567 35.5449C60.8268 37.9619 60.0871 40.2428 58.1435 42.3779ZM44.5506 82.9308C46.0659 81.4278 47.4536 80.5525 48.712 80.3082C51.424 79.7812 53.9718 80.3402 56.3492 81.9939C58.7285 83.64 60.1915 85.8645 60.7369 88.6748C60.7943 88.9647 60.8207 89.4866 60.8184 90.24C60.8151 90.9991 60.8358 91.5205 60.8932 91.8136L60.9219 91.9534L61.3341 90.9685L60.5727 97.9007C59.9162 93.5045 57.8993 90.2296 54.5186 88.0725C51.1346 85.9172 47.2174 85.2715 42.7605 86.1369C41.9868 86.2866 41.4226 86.4993 41.0734 86.7713C42.2235 85.4419 43.3802 84.1638 44.5506 82.9308ZM61.192 90.2447C61.2748 89.6245 61.2489 88.9774 61.1162 88.2951C60.5351 85.3016 58.9948 82.9379 56.5002 81.2075C54.0024 79.4871 51.2019 78.9191 48.1045 79.52C51.9581 75.5614 54.2221 73.2621 54.9045 72.6212L56.0391 72.2527C57.5854 71.9539 59.0259 72.2527 60.3567 73.1487C61.6875 74.048 62.5007 75.2654 62.8019 76.8184C62.9539 77.5934 62.8118 79.8334 62.3755 83.5341C61.9388 87.2306 61.5478 89.4739 61.192 90.2447ZM63.1821 87.2922C64.7638 85.0819 67.0499 83.68 70.0532 83.096C74.7002 82.1915 78.2132 83.7214 80.5925 87.68L80.7388 87.6508L85.3628 95.9487C81.1082 91.648 76.2263 90.0315 70.7087 91.1054C67.1219 91.8014 64.2918 93.7642 62.2038 96.9816C62.6664 92.6692 63.0009 89.4405 63.1821 87.2922ZM84.9205 92.1134L79.9765 83.7242C79.6583 81.0781 80.2951 78.6692 81.8842 76.4998C83.4696 74.3299 85.5741 72.9906 88.1896 72.4819C90.3153 72.0673 94.0108 72.9614 99.2607 75.1525C94.9195 76.0974 91.4574 78.0551 88.8711 81.0221C86.2828 83.9873 84.9661 87.6838 84.9205 92.1134ZM92.232 70.7915C89.5101 69.2132 87.8621 66.9205 87.2786 63.9191C86.2621 58.6889 88.1082 55.2725 92.8137 53.6461L92.9073 53.3351L99.7365 51.2466C95.9021 55.3096 94.5129 60.0546 95.5666 65.4734C96.2438 68.9595 97.8659 71.8659 100.431 74.176C95.4235 72.2353 92.6951 71.1106 92.232 70.7915ZM91.4485 21.8085C90.7609 24.4536 90.6932 27.232 91.2584 30.1374C92.1059 34.4946 94.1082 38.1976 97.264 41.2527C100.423 44.3064 104.148 46.3205 108.461 47.2894L102.998 48.656C99.1266 49.4085 95.5398 48.6503 92.2311 46.3783C88.9271 44.104 86.9002 41.0315 86.1464 37.1619C85.9016 35.8993 85.8946 34.216 86.1412 32.1078C86.3854 30.0042 86.9167 28.7195 87.7285 28.2574L87.5558 28.1416L91.4485 21.8085ZM68.7793 26.1412C72.864 27.5073 76.9835 27.7854 81.1501 26.9755C83.7661 26.4668 86.1045 25.6103 88.1821 24.3991L86.3407 27.3247L86.1962 27.3529C84.7638 30.8471 81.728 33.0419 77.0791 33.9459C73.2993 34.6809 69.6183 34.0903 66.0311 32.1741C62.4424 30.2631 60.2819 27.4136 59.5464 23.6386L58.672 19.1379C61.3238 22.4433 64.6918 24.776 68.7793 26.1412ZM39.6094 35.0508C44.1605 34.1671 48.0965 31.9256 51.4127 28.3106C54.7271 24.7012 56.4955 20.6108 56.7129 16.0475L58.352 24.4791C58.9515 28.0758 57.9708 31.5327 55.3986 34.8471C52.8226 38.16 49.7012 40.1741 46.0221 40.8899C42.1478 41.6419 38.824 40.8306 36.0546 38.4583L35.7896 38.6607L30.3562 34.736C33.6193 35.5176 36.7073 35.6165 39.6094 35.0508ZM29.6904 55.7431C32.0593 51.1214 32.7779 46.4301 31.8569 41.688C31.4979 39.8489 30.8447 38.016 29.8856 36.1948C32.0795 37.6701 34.2376 39.2089 36.3609 40.8118C38.4358 42.7176 39.7299 44.9784 40.2391 47.5925C40.9718 51.3647 40.2922 54.8433 38.1953 58.0151C36.0998 61.1882 33.2151 63.1304 29.5341 63.8461C28.568 64.0344 27.8758 64.1162 27.4734 64.0951L27.4089 64.5562L19.456 65.5007C23.9144 63.6301 27.3256 60.3774 29.6904 55.7431ZM32.4212 82.5699C30.8202 74.3449 26.4386 69.1186 19.2744 66.8927C24.3045 65.9139 28.2339 65.4485 31.0607 65.5031C33.3007 65.6739 35.3939 66.8489 37.3271 69.0414C39.2574 71.224 40.4574 73.5256 40.9299 75.9464C41.7012 79.9181 41.0273 83.4108 38.8983 86.4353C38.4504 87.2311 35.9496 89.8762 31.3986 94.3793C32.8551 90.4762 33.1925 86.5431 32.4212 82.5699ZM58.8047 113.622C58.8456 112.808 58.5572 111.554 57.9271 109.871C56.3224 105.257 53.2899 101.654 48.8132 99.0602C44.3388 96.4588 39.6842 95.632 34.8414 96.5751C33.0024 96.9318 31.0833 97.6588 29.0833 98.7487C31.3238 96.3049 33.5666 93.9063 35.8249 91.5576C38.8024 88.776 41.4969 87.1402 43.92 86.6696C47.9816 85.8786 51.5464 86.616 54.6028 88.8852C57.6555 91.1605 59.5647 94.2772 60.3384 98.2499C60.4678 98.9285 59.9591 104.05 58.8047 113.622ZM92.3525 107.853C87.2513 103.317 81.3576 101.697 74.6762 102.995C67.8028 104.333 62.936 108.243 60.0776 114.726C60.928 107.23 61.5981 101.62 62.0786 97.9111C64.2452 94.5746 67.0706 92.5666 70.5591 91.8866C77.3318 90.5699 82.8024 93.1271 86.9699 99.5487L87.376 99.3181L92.3525 107.853ZM109.029 82.0028C103.511 83.0734 99.2207 85.9388 96.1609 90.6042C93.0969 95.2687 91.9553 100.39 92.7383 105.967L85.8979 94.0325C85.5097 89.9873 86.4932 86.2541 88.8456 82.8348C91.1962 79.4122 94.352 77.3172 98.3214 76.5463C99.9694 76.2254 101.216 76.1798 102.069 76.4188C103.324 76.6786 105.536 77.4743 108.712 78.8212C111.885 80.1619 113.888 81.1558 114.719 81.8009C112.668 81.5915 110.774 81.6631 109.029 82.0028Z" fill="white"/>
                </svg>
                <br/>
                На паутину
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                <svg style={{ width: 'calc(100vw / 15)' }} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.8402 81.6013C35.7908 81.0188 35.8542 80.4567 35.9652 79.9104H31.7488V71.5859H40.1071V75.3533C40.497 75.2372 40.9028 75.1564 41.3245 75.1211L44.1192 74.8832V71.587H52.4766V73.6412L56.0176 67.8112C56.1557 67.5836 56.3245 67.3838 56.4887 67.1794V65.4718L52.4765 62.9856V67.591H44.1192V59.2665H46.7358C43.8579 56.928 41.8168 53.6261 41.1658 50.1041C40.5529 46.7948 41.677 43.5551 44.1201 41.3586V34.6256H52.4775V39.0851C53.5698 39.3137 54.6277 39.7113 55.5951 40.3115L56.4897 40.8661V34.6266H64.848V42.951H59.8526L68.8602 48.5356V46.9469H72.5804L73.7604 42.9509H68.8593V34.6264H75.9125L76.0786 30.6304H68.8594V22.3069H76.4249L76.5592 19.0692C76.5704 18.809 76.6226 18.5619 76.6655 18.3111H68.8587V9.98658H77.2169V16.61C78.0136 15.0417 79.4698 13.8831 81.2292 13.4855L81.2301 9.98658H82.2282C83.3355 9.98658 84.2338 9.09282 84.2338 7.98909C84.2338 6.88536 83.3355 5.9916 82.2282 5.9916H81.2301V4.99749C81.2301 3.89376 80.3318 3 79.2245 3C78.1172 3 77.2189 3.89376 77.2189 4.99749V5.9916H68.8606V4.99749C68.8606 3.89376 67.9623 3 66.855 3C65.7477 3 64.8494 3.89376 64.8494 4.99749V5.9916H56.4911V4.99749C56.4911 3.89376 55.5937 3 54.4855 3C53.3773 3 52.4799 3.89376 52.4799 4.99749V5.9916H44.1225V4.99749C44.1225 3.89376 43.2251 3 42.1169 3C41.0087 3 40.1113 3.89376 40.1113 4.99749V5.9916H31.753V4.99749C31.753 3.89376 30.8556 3 29.7474 3C28.6392 3 27.7418 3.89376 27.7418 4.99749V5.9916H19.3845V4.99749C19.3845 3.89376 18.4861 3 17.3789 3C16.2707 3 15.3733 3.89376 15.3733 4.99749V5.9916H7.01497V4.99749C7.01497 3.89376 6.11758 3 5.00936 3C3.90115 3 3.00375 3.89376 3.00375 4.99749V5.9916H2.00561C0.897394 5.9916 0 6.88536 0 7.98909C0 9.09282 0.897394 9.98658 2.00561 9.98658H3.00375V18.3111H2.00561C0.897394 18.3111 0 19.2048 0 20.3085C0 21.4123 0.897394 22.306 2.00561 22.306H3.00375V30.6296H2.00561C0.897394 30.6296 0 31.5233 0 32.627C0 33.7308 0.897394 34.6245 2.00561 34.6245H3.00375V42.949H2.00561C0.897394 42.949 0 43.8428 0 44.9465C0 46.0502 0.897394 46.944 2.00561 46.944H3.00375V55.2675H2.00561C0.897394 55.2675 0 56.1613 0 57.265C0 58.3687 0.897394 59.2625 2.00561 59.2625H3.00375V67.587H2.00561C0.897394 67.587 0 68.4816 0 69.5845C0 70.6873 0.897394 71.5819 2.00561 71.5819H3.00375V79.9064H2.00561C0.897394 79.9064 0 80.8011 0 81.9039C0 83.0067 0.897394 83.9014 2.00561 83.9014H3.00375V84.8955C3.00375 85.9983 3.90115 86.893 5.00936 86.893C6.11758 86.893 7.01497 85.9983 7.01497 84.8955V83.9014H15.3733V84.8955C15.3733 85.9983 16.2707 86.893 17.3789 86.893C18.4871 86.893 19.3845 85.9983 19.3845 84.8955V83.9014H27.7418V84.8955C27.7418 85.9983 28.6392 86.893 29.7474 86.893C30.8556 86.893 31.753 85.9983 31.753 84.8955V83.9014H36.5423C36.1589 83.1981 35.9117 82.4177 35.8408 81.601L35.8402 81.6013ZM56.4888 9.9871H64.847V18.3116H56.4888V9.9871ZM56.4888 22.3075H64.847V30.6311H56.4888V22.3075ZM44.1192 9.9871H52.4765V18.3116H44.1192V9.9871ZM44.1192 22.3075H52.4765V30.6311H44.1192V22.3075ZM31.7487 9.9871H40.107V18.3116H31.7487V9.9871ZM31.7487 22.3075H40.107V30.6311H31.7487V22.3075ZM31.7487 34.627H40.107V42.9515H31.7487V34.627ZM31.7487 46.9475H40.107V55.271H31.7487V46.9475ZM31.7487 59.267H40.107V67.5915H31.7487V59.267ZM15.3679 79.911H7.00958V71.5865H15.3679V79.911ZM15.3679 67.5915H7.00958V59.267H15.3679V67.5915ZM15.3679 55.271H7.00958V46.9475H15.3679V55.271ZM15.3679 42.9515H7.00958V34.627H15.3679V42.9515ZM15.3679 30.6311H7.00958V22.3075H15.3679V30.6311ZM15.3679 18.3116H7.00958V9.9871H15.3679V18.3116ZM27.7374 79.9103H19.3801V71.5858H27.7374V79.9103ZM27.7374 67.5908H19.3801V59.2663H27.7374V67.5908ZM27.7374 55.2703H19.3801V46.9468H27.7374V55.2703ZM27.7374 42.9508H19.3801V34.6263H27.7374V42.9508ZM27.7374 30.6303H19.3801V22.3068H27.7374V30.6303ZM27.7374 18.3109H19.3801V9.98638H27.7374V18.3109ZM127.755 45.2797C127.392 44.6155 126.702 44.2373 125.99 44.2373C125.666 44.2373 125.338 44.3154 125.034 44.4807L109.585 52.8599C109.443 52.938 109.308 53.0337 109.188 53.1442L99.2616 62.2314L93.0609 62.4042C93.0544 61.9601 93.0236 61.5253 92.962 61.1035C93.0917 61.11 93.2195 61.1128 93.3464 61.1128C95.2316 61.1128 96.8129 60.4142 97.6822 59.0243C99.1225 56.7193 98.5105 52.4296 96.0376 49.7523L106.544 32.9425C107.13 32.006 106.842 30.7732 105.901 30.1907C105.571 29.9863 105.205 29.8888 104.843 29.8888C104.173 29.8888 103.518 30.2232 103.138 30.8308L92.6318 47.6405C91.8164 47.4018 90.9675 47.2912 90.1262 47.2903C87.35 47.2903 84.6579 48.4944 83.5525 50.2633C82.6253 51.747 82.7661 53.6088 83.7633 55.3993C83.3566 55.5312 82.9508 55.6947 82.5478 55.8852L79.9649 50.2662L83.771 37.3837C83.8177 37.2267 83.8447 37.065 83.8512 36.9024L84.5798 19.3977C84.6255 18.2959 83.7664 17.3649 82.6591 17.3185C82.6311 17.3176 82.6022 17.3166 82.5742 17.3166C81.5042 17.3166 80.6161 18.1574 80.5714 19.2314L79.8531 36.4907L75.9053 49.8536C75.7691 50.3163 75.8046 50.8115 76.0061 51.25L79.2133 58.2254C78.9194 58.5088 78.6321 58.8061 78.3541 59.1229L53.4751 43.7031C52.5646 43.1392 51.5553 42.8577 50.5487 42.8577C49.4666 42.8577 48.3882 43.1819 47.4368 43.8276C45.6 45.0754 44.7091 47.2021 45.1121 49.3779C45.6765 52.4289 47.7381 55.3463 50.4805 57.0464C50.585 57.1114 50.6914 57.1737 50.7986 57.2359L61.5142 63.8779C64.9163 65.8336 68.8296 66.9522 72.9163 67.2132L60.8835 68.9338C60.2893 69.0183 59.7641 69.364 59.4525 69.8777L54.5149 78.0081L41.6678 79.1017C40.5642 79.1955 39.7461 80.1626 39.8394 81.2627C39.8954 81.9149 40.261 82.4677 40.7788 82.7891C41.0875 82.9805 41.4514 83.0901 41.8357 83.0901C41.8926 83.0901 41.9504 83.0874 42.0083 83.0827L55.8732 81.9037C56.5122 81.8499 57.0869 81.4949 57.4199 80.9468L62.3948 72.7543L73.7735 71.1275L72.752 72.7618L62.2184 77.672C61.849 77.8439 61.5403 78.1264 61.335 78.4766L54.7912 89.6878L35.043 96.4077C33.9935 96.7654 33.4347 97.9007 33.7929 98.945C33.9487 99.3984 34.2519 99.7598 34.6297 99.994C34.945 100.189 35.3126 100.297 35.6913 100.297C35.9058 100.297 36.1241 100.262 36.3387 100.189L56.7969 93.2258C57.254 93.0715 57.6402 92.7557 57.8827 92.3404L64.4882 81.0253L68.8622 78.9869L62.3277 89.4427C61.2176 91.2181 59.1429 97.6872 62.4396 99.7312C63.0087 100.084 63.6262 100.236 64.2633 100.236C67.3184 100.236 70.8389 96.7582 71.7569 95.2884L78.2914 84.8326L78.3856 89.6415L71.1084 100.539C70.8416 100.94 70.7269 101.423 70.7894 101.9L73.5479 123.256C73.629 123.875 73.9854 124.391 74.4788 124.698C74.7885 124.89 75.1533 125 75.5376 125C75.6225 125 75.7083 124.994 75.7941 124.983C76.893 124.842 77.6682 123.841 77.5283 122.746L74.8642 102.132L82.074 91.3343C82.3007 90.997 82.4173 90.5957 82.4098 90.1897L82.1822 78.608L83.2037 76.9747L86.7614 87.8607L81.5767 95.9223C81.2315 96.4603 81.1643 97.1311 81.3966 97.7257L86.4555 110.637C86.6188 111.055 86.9089 111.387 87.2634 111.607C87.5796 111.803 87.9481 111.91 88.325 111.91C88.5675 111.91 88.8138 111.866 89.0526 111.772C90.0852 111.371 90.5946 110.212 90.1925 109.185L85.5049 97.2211L90.6505 89.2189C90.9742 88.7153 91.0545 88.0919 90.8688 87.5233L87.1028 75.9982C89.1495 79.5473 91.9024 82.5638 95.2018 84.7648L105.803 91.3352C105.908 91.4049 106.015 91.4746 106.123 91.5415C108.051 92.7372 110.336 93.3708 112.553 93.3708C113.544 93.3708 114.522 93.2444 115.448 92.9834C117.588 92.3832 119.111 90.6477 119.424 88.4561C119.737 86.2634 118.757 84.1739 116.87 83.0042L91.9933 67.5845C92.1556 67.1961 92.2974 66.8078 92.4234 66.4204L100.124 66.2067C100.608 66.1937 101.069 66.006 101.425 65.6799L111.723 56.2535L126.954 47.9923C127.926 47.4636 128.285 46.2494 127.756 45.2804L127.755 45.2797ZM63.5754 60.4514L52.8608 53.8104C50.9382 52.7123 49.4298 50.6721 49.0575 48.654C48.8952 47.7798 49.4493 47.2967 49.6956 47.1304C49.8495 47.0263 50.1611 46.8563 50.5575 46.8563C50.7982 46.8563 51.0697 46.9185 51.3551 47.096L76.1076 62.4415C75.9686 62.7138 75.8324 62.986 75.7121 63.2601C75.3874 63.2721 75.0638 63.2786 74.741 63.2786C70.7027 63.2786 66.8352 62.3236 63.5757 60.4514L63.5754 60.4514ZM64.6715 96.1563C64.6388 95.8766 64.65 95.5087 64.6929 95.1009L65.6127 95.6713C65.2648 95.8896 64.9383 96.0615 64.6715 96.1563H64.6715ZM68.582 92.8041L65.9644 91.182L67.1435 89.295L69.7611 90.9172L68.582 92.8041ZM71.8813 87.5243L69.2638 85.9021L70.4438 84.0143L73.0614 85.6364L71.8813 87.5243ZM75.1817 82.2444L72.5641 80.6223L73.7432 78.7353L76.3608 80.3575L75.1817 82.2444ZM78.481 76.9646L75.8635 75.3424L76.5939 74.1746C76.9512 74.5434 77.3486 74.8751 77.7982 75.1538C78.2469 75.4325 78.7217 75.6407 79.2115 75.7977L78.481 76.9646ZM87.401 67.7732C85.6109 70.6375 83.0857 72.1055 81.2565 72.1055C80.7462 72.1055 80.29 71.9912 79.9188 71.7608C78.2172 70.7063 77.9178 66.9771 80.207 63.3136C81.9971 60.4493 84.5223 58.9822 86.3515 58.9813C86.8627 58.9813 87.3189 59.0956 87.6902 59.326C89.3908 60.3805 89.6911 64.1097 87.401 67.7732ZM114.749 86.3983C115.508 86.8685 115.493 87.6024 115.451 87.8951C115.409 88.1887 115.219 88.8975 114.359 89.14C113.797 89.298 113.193 89.3751 112.575 89.3751C111.015 89.3751 109.355 88.8864 107.979 87.9806L97.3778 81.4102C93.9636 79.1321 91.2266 75.7643 89.4355 71.7674C89.6286 71.5388 89.8143 71.2972 89.998 71.0529L114.749 86.3983ZM89.8106 55.9332C87.3712 54.4206 86.803 52.6219 86.9571 52.3748C87.2332 51.9335 88.6343 51.2571 90.1614 51.2571C90.9049 51.2571 91.6782 51.4179 92.3657 51.8443C94.4656 53.146 94.6848 56.2565 94.2743 56.9125C94.2146 57.0082 93.8956 57.1104 93.3844 57.1104C92.5812 57.1095 91.3023 56.8577 89.8106 55.9333L89.8106 55.9332Z" fill="white"/>
                </svg>
                <br />
                На москитную сетку
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                <svg style={{ width: 'calc(100vw / 15)' }} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#fff">
                    <path d="m78.2 100.5-1.8-1.4a165.7 165.7 0 0 1-3.2-1.3l.2.5L77 100l-2.7 1.6v.6l3.3-2 .6.3ZM54.3 89.6l-.7-.2-1.2.5-.3.7 2.2-1ZM60.6 80.7l-.1-.1-.2.4.3-.1v-.2ZM65.9 83l-2.4 1.4.1.5 2.6-1.4-.3-.4ZM66.5 89l1 .6.6-.3-1-.5 1-.7-.1-.4-1.5.8-2.8-1.6 1 1.1 1.3.8-.4.2.3.4.6-.3ZM61.7 103.4l1 1 3.2 1.7-.8.4.5.3 1-.4 2.4 1.2.4-.4-2.3-1.1.6-.3-.9-.2-.3.2-.8-.5c-.5 0-1-.3-1.3-.5L63 104l-1.3-.8v.2ZM61.7 102.9v.2a161 161 0 0 0 3.3-1.7c0-.2-.2-.3-.3-.5l-3 1.6v.4ZM56.4 94.3l1.1-.6-.4-.4-1.3.6-3.8-2.4.1.7 3.1 2-2.1 1 .2.5 2.5-1.2c1.5 1 3.1 2 4.7 2.8 1-.3 1.6-.7 2-.9L61 97l-4.7-2.7ZM60.3 91.4l.4.2-.5.2-.2.7 1-.5v-.5l-.3-.5-.2-.2-.2.6ZM68.8 78.3v.6L71 80l-1 .5h.2c0 .2.2.3.3.3l1-.6 2.4 1.4.3-.5c-.8-.3-1.5-.7-2.3-1.2l2.2-1.4-.2-.4-2.5 1.6-2.6-1.5ZM81.4 96.4l.3.1.7-.3-1-.5v.7ZM81.8 91l-1.5 1 .2.5.2-.2-.1-.5.6.2 1.2-.8 2.1 1 .2-.6-1.8-.7 2-1.4-.6-.2-2 1.3-3-1.3.3.7 2.2 1ZM84.4 75.7l.6.3v-.2l-.2-.5c-.2 0-.3 0-.5-.2v.6ZM91.2 88.7v.7c.4 0 .7.2 1 .3l-.8.7.2.6 1.3-1 1.9.6-.6-.7-.8-.3.3-.3-.4-.4-.5.4c-.6-.1-1.1-.3-1.6-.6ZM83.8 77.7l-.1.3 1.2-.9.2-.7-1 .7-.3.6ZM46.1 109l-3 1.1-2.1-1.3.5 1c.2 0 .4.2.5.3a27 27 0 0 0 1.6.4l3-1.1-.5-.4ZM47.3 94.4l-1.6-1 1.7-.8c0-.2-.2-.3-.4-.4l-1.9.7-.2.1.3.7 2 1.3.1-.6Z
                            M98.4 118.2a35 35 0 0 0 7.7-8.2l.3-.5a27.2 27.2 0 0 0 3.1-7.4 22 22 0 0 0 .4-7.6 20.5 20.5 0 0 0-3.6-9.1v-.1l-.3-.4a104.9 104.9 0 0 1-5.7-9l-2-3.5-.3-.4-1-1.8-.6-1-.7-1.2-.2-.4a704.3 704.3 0 0 1-4.7-8.3l-.2-.5-1.2-2.2-.5-.9a220.5 220.5 0 0 1-2.7-5.1l-.3-.5-.4-.7a266.8 266.8 0 0 1-1.6-3.1l-.3-.5a1238.3 1238.3 0 0 1-4.2-8l-.2-.5-1.7-3.2-.5-1-1.9-3.6-.2-.5a1691.5 1691.5 0 0 1-2.4-4.6l-1.5-3V0h-1.3v13.2L66.9 15l-3.7-1.5V0H62v21.4l-1.4 3-.6 1.1-1.7 3.5-.3.5-1.9 3.6-.5 1-1.6 3.2-.3.5a1933.1 1933.1 0 0 1-4.2 8l-.2.5-1.2 2.3-.5.8-.4.7a115.3 115.3 0 0 1-2.5 4.8l-.5.8-.4.9-1.3 2.2-.2.5a793.4 793.4 0 0 1-4.6 8.3l-.3.4a473 473 0 0 1-7.5 12.7l-.3.4A135 135 0 0 1 27 85l-.2.4a22.2 22.2 0 0 0-2.3 4.1 21.1 21.1 0 0 0-1 12.7 22.1 22.1 0 0 0 2.1 5.8l1 1.6.3.5a29 29 0 0 0 7.8 8.2l.5.4c1.6 1.1 3.3 2.2 5.1 3l.4.3a43.7 43.7 0 0 0 7.6 3l.8.2a59 59 0 0 0 22.2 2.2 66.3 66.3 0 0 0 12.6-2.2l.9-.2a52.8 52.8 0 0 0 7.6-3l.3-.2a40.4 40.4 0 0 0 5.7-3.5Zm9.3-13.7h-.2l.3-.2-.1.2Zm1.2-5-2.6-.7 2.7-2.2-.1 2.9Zm-2-11-3-.9 1.6-1.5 1.4 2.3Zm-4.2-6.6v.1h-.1v-.1Zm-4-6.6-2.7-1c.5-.3 1-.7 1.4-1.2l1.3 2.2Zm-1.5-2.6-1.7 1.5-4.7-1.8 3.6-3.2 1 .4 1.8 3.1Zm-2.6-4.4-.2.2-4.5-1.8 2.5-2.3 2.2 4ZM92.2 64l-2.8 2.5-4.4-2 3.5-3 2.2 1c.3 0 .6.2.8.3l.7 1.2ZM62.6 22.6Zm7.8 0Zm-.7-4.2-6.5 1v-.8l3.8-2.3 2.7 1.1v1Zm-6.5 2.4 6.5-1V21h-6.5v-.3Zm.7 1.6h5.4L66.5 25l-2.7-2.6Zm5.5 5.8-2.9 2.5-2.9-2.5 3-2.5 2.8 2.5Zm.4 11.5-3.3 2.6-3.2-2.6 3.2-2.5 3.3 2.5Zm-6.4-5.8 3.1-2.5 3.1 2.5-3 2.6-3.2-2.6Zm7.2 17L67 48.4l3.4-2.6 3.6 2.4-3.4 2.7Zm3.8-2.4 3.8 2.2-3.4 2.8a121 121 0 0 1-3.8-2.3l3.4-2.7ZM63 51.2l3.6-2.5 3.6 2.5a121 121 0 0 1-3.6 2.6L63 51.2Zm3.1 3-3.7 2.4-3.6-2.7 3.8-2.4c1.1 1 2.3 1.8 3.5 2.6Zm.5-6.2a116 116 0 0 1-3.4-2.6l3.4-2.4 3.4 2.4c-1 1-2.2 1.8-3.4 2.6Zm3.9-2.9L67 42.6a111 111 0 0 0 3.2-2.6l3.4 2.4c-1 1-2.1 1.8-3.2 2.7ZM66 42.6l-3.4 2.5-3.3-2.7 3.4-2.4 3.3 2.6Zm0 5.8-3.6 2.5-3.4-2.7a118 118 0 0 0 3.5-2.4l3.5 2.6ZM62 51.2l-3.7 2.3-3.4-2.8 3.7-2.2 3.4 2.7Zm-.2 5.7c-1.3.9-2.6 1.7-4 2.4l-3.5-2.8 4-2.3c1.1 1 2.3 1.8 3.5 2.7Zm.5.4 3.7 2.6a131 131 0 0 1-4 2.5l-3.7-2.7a126 126 0 0 0 4-2.4Zm.5-.3 3.7-2.5 3.7 2.5a128 128 0 0 1-3.7 2.5L62.8 57ZM67 54l3.6-2.6 3.7 2.4-3.6 2.7a124 124 0 0 1-3.7-2.5Zm7.8.1 4 2.3c-1.2 1-2.4 2-3.6 2.8l-4-2.4 3.6-2.7Zm4.4 2.6 4 2.2c-1 1-2.2 2-3.4 2.9l-4.1-2.3 3.5-2.8Zm.5-.4 3.4-3c1.3.8 2.7 1.4 4 2.1l-3.3 3a126 126 0 0 1-4.1-2.1Zm-.5-.3-4-2.3 3.5-2.8 3.9 2.2-3.4 3Zm-.6-5.7L75 48l3.2-2.8 3.8 2.2-3.3 2.9Zm-4.2-2.6-3.6-2.4 3.3-2.7 3.6 2.3-3.3 2.8Zm-.4-5.7-3.4-2.4 3.1-2.7 3.4 2.3-3 2.8Zm-3.8-2.8L66.9 37l3.1-2.6 3.3 2.4-3.1 2.6Zm-.2-5.7L67 31l2.9-2.6 3 2.4-2.9 2.7ZM66.1 31l-3 2.5-3-2.7 3-2.4 3 2.6Zm0 5.8-3.3 2.4-3-2.6 3.2-2.4 3 2.6Zm-3.7 2.8L59 42l-3.1-2.8 3.4-2.3 3.1 2.7Zm-.2 5.7-3.6 2.4-3.2-2.8 3.5-2.3 3.3 2.7Zm-4 2.7-3.8 2.3-3.2-3a119 119 0 0 0 3.7-2.1l3.2 2.8Zm-.4 5.7-4 2.3-3.4-2.9 4-2.2c1 1 2.2 2 3.4 2.8Zm-4.4 2.6-4.1 2.1-3.4-3 4-2 3.5 2.9Zm.4.4 3.6 2.8-4.1 2.3-3.6-3a130 130 0 0 0 4.1-2.1Zm4 3.2 3.8 2.7-4.2 2.4-3.6-2.8 4-2.3Zm-.3 5.7 4 2.8c-1.4.9-2.8 1.7-4.3 2.4l-4-2.9 4.3-2.3Zm4.4 3.1 4.2 2.7-4.3 2.5-4.2-2.8c1.5-.7 3-1.6 4.3-2.4Zm-4-3.3a134 134 0 0 0 4.2-2.4l4 2.6-4.1 2.6-4-2.8Zm4.6-2.7 4-2.6c1.3 1 2.7 1.8 4 2.6-1.3 1-2.6 1.8-4 2.7a134 134 0 0 1-4-2.7Zm4.5-3 3.7-2.5 4 2.4c-1.2 1-2.4 1.8-3.7 2.7a130 130 0 0 1-4-2.5Zm8.2.2 4 2.3c-1.1 1-2.4 1.9-3.6 2.8l-4.1-2.4 3.7-2.7Zm4.5 2.5 4.3 2.2-3.7 2.9-4.3-2.3 3.7-2.8Zm.5-.4 3.6-3 4.2 2.1-3.5 3a133 133 0 0 1-4.3-2Zm10.9-.2L89 61l1-1 1 2Zm-3.4-6.1 2 3.8-1.2 1.2a130 130 0 0 1-4.3-2l3.4-3h.1Zm-.5-.9-3.7-1.8 1.8-1.7 2 3.5Zm-3.4-6.4 1.3 2.4-2 2-4-2.2 3.3-3 1.4.8Zm-.4-.8-.6-.4.3-.2.3.6Zm-.6-1.1-.5.5-3.7-2.2 2.2-2 2 3.7Zm-3-5.7.7 1.4-2.4 2.3-3.6-2.2 3.1-2.8 2.2 1.3Zm-.5-.9-1.3-.8.6-.6.7 1.4Zm-1-1.9-.8.8-3.4-2.3 2.3-2.2 2 3.7Zm-2.7-5.3.6 1.1-2.5 2.4-3.3-2.4 3-2.7 2.2 1.6Zm-.5-1c-.5-.3-1-.6-1.3-1l.5-.5.8 1.5Zm-1-2-.8.7-3-2.4 2-1.9c.5 1 1 2.3 1.8 3.6Zm-2.1-4-2.2 2-2.9-2.5a94 94 0 0 0 2.8-2.6L71 24l1 1.8Zm-2.3-11V16l-1.4-.5 1.4-.8Zm-4.1 1L63.2 17v-2.3l2.4 1Zm-3.6 8 1.4-1 2.7 2.5-2.9 2.5-2.1-2 1-2Zm-1.2 2.4 2 2-3 2.3-.8-.7 1.8-3.6Zm-2 4.1.5.5-1.3 1 .7-1.5Zm-1.4 2.5 2.3-1.6 2.9 2.7-3.2 2.4a102 102 0 0 1-2.5-2.4l.5-1Zm-.8 1.6 2.3 2.2a106 106 0 0 1-3.4 2.3l-.8-.8 1.9-3.7Zm-2.2 4.2.6.6-1.3.8.7-1.4ZM53.2 41l2.2-1.3 3.1 2.8-3.5 2.2-2.5-2.3.7-1.4Zm-1 2 2.3 2a114 114 0 0 1-3.7 2.2l-.6-.5 2-3.8ZM50 47l.3.2-.6.4.3-.6Zm-.8 1.4 1.5-.8 3.2 3-4 2.1a118 118 0 0 1-2-1.9l1.3-2.4Zm-1.5 2.9 1.8 1.7a122 122 0 0 1-3.7 1.8l1.9-3.5Zm-2.4 4.4h.1l3.4 3a132 132 0 0 1-4.3 2l-1.2-1.2 2-3.8ZM43 60l1 1-2 .9 1-1.9Zm-1.5 2.8.8-.4 2.3-1 3.5 3c-1.5.8-3 1.4-4.5 2L40.8 64l.7-1.2Zm-.9 1.6 2.6 2.3-4.6 1.8-.2-.2a667 667 0 0 0 2.2-4Zm-5 8.7 1.4 1.3-2.7 1 1.3-2.3ZM33 77.5l3 2.7a151 151 0 0 1-5 1.6l-.4-.4 2.4-3.9ZM30.3 82h.2l-.3.1.1-.1ZM27.5 86l1.7 1.5-3 .8 1.3-2.3Zm-3.4 10.5 2.7 2.2-2.6.7c-.1-1-.2-2-.1-3Zm1.2 8v-.3l.2.2h-.2Zm41.2 21.7c-1.9 0-3.7 0-5.4-.2a191 191 0 0 0 5.4-2.4L72 126a70 70 0 0 1-5.5.2Zm27.2-12-1.7.7-1.3.8-.4-.1-.8.3.6.2-2.7 1.7-.1.7 3.5-2.2 5.6 1.8a41 41 0 0 1-5.6 3.2L87 120l-.2.5 3.4 1.2c-2.2 1-4.5 1.8-7 2.5l-2.7-1a5 5 0 0 1-.5.4l2.2.9c-2.5.6-5.2 1.1-8.1 1.4l4-2.1a2 2 0 0 1-.2-.4l-5 2.5-5.6-2.5 1.5-.7-.3-.3-.1-.1-1.8.8-2.1-1h-1.1l2.6 1.3-5.7 2.5-2.9-1.5-.8.2L59 126c-2.9-.3-5.5-.8-8-1.4l3-1.2 2 1 .3-.4-1.6-.9c.7-.2 1.5-.5 2.2-.9v-.3h-.5l-2.4 1c-.3-.3-.6-.5-1-.6a5 5 0 0 1-.4.4c.3 0 .5.2.8.4l-3.4 1.2c-2.5-.7-4.9-1.5-7-2.5l5-1.7 1.9 1 .1-.5-1.3-.8h.3l-.7-.4H48c-.4-.1-.7-.4-1-.6l-1.7-.7-1.3-.4 3.3 2-5.2 1.8A42 42 0 0 1 38 119l-1.1-.8-.2-.1.8-.2.7-.3 1-.6-.1-.2-3 .9c-1.6-1.2-3-2.4-4.3-3.6l4.9-1.5 1.7 1.2v-.5l-.3-.4-.7-.5h.2c0-.2-.2-.3-.4-.5l-.4.1c-1.6-1-3.2-2.2-4.8-3.4h.4a2 2 0 0 0-1.1.2l4.9 3.4-4.8 1.4a29.1 29.1 0 0 1-3.3-4l1-.2-.1-.5-1.2.3a24.7 24.7 0 0 1-2.2-4.3h.6l2.4 1.8v-.6l-1.8-1.5 2.1-.5v-.6l-2.6.7-1.3-1-.7-3.3 3-.7.3.1-.3-.9-3.1-2.6.1-1.1L27 94V93.5l-2.7.7c.2-1.2.5-2.3.9-3.4l1.9 1.6.1-.6-1.8-1.6.5-1.1 3.8-1 3.3 2.6a38 38 0 0 1-.5-1l-2.2-1.9 1.5-.4-.1-.5-1.9.5-2-1.7 2-3c.4 0 .8-.2 1.1-.3l.6.5.1-.6v-.1l.5-.6c.1-.1.5-.4 1.4 0l3-1 1.5 1.2.2-.5-1.1-1 1.8-.6.2-.6-2.5.9-3.3-3 .5-.8 3.8-1.3 2.2 2v-.3c0-.2-.3-.6-.5-.8v-.1l-1.2-1 .4-.2-.4-.5-.6.2-1.6-1.5 1.8-3.1 1-.4.1.2 3.4 3-.7.3h.4c.7 0 1.5-.5 2.2-1.1l-1.4.6-3.6-3.2 4.6-1.9.6.5v-.4l.7.4-.8-.7a134.1 134.1 0 0 0 4.4-2l1.5 1.2.1-.5-1.2-1 1.5-.7.1-.7-2 1-3.6-3 4.3-2 3.5 2.9-1.6.8.2.6 2-1c1.1 1 2.3 2 3.6 2.8l-4.1 2.2v.9l3.9 2.8-2.6 1.3.3.4.4-.2 2.3-1.2 3.6 2.5.2-.2v.3l.3.2-.2.1v.5l.7-.3 3.5 2.2.1-.5-3.2-2 3-1.7v-.4l.2.3 1.1-.7 4.3 2.5-2.7 1.7.2.4 3-1.8 1 .6-.5-.8v-.1l-.3-.4-.3.1-4.2-2.5.3-.2a10 10 0 0 1-.3-.4l-.5.3-4.1-2.6 4.1-2.6 4.2 2.6-1.6 1h.7l1.3-.8.8.5.3-.4-.7-.4 1.2-.8v-.6l-1.6 1.2a134 134 0 0 1-4.2-2.6l4-2.6 4.1 2.4-.5.4.3.3.7-.5 4.3 2.3-4 3-.2-.2V71.6l.2-.1a145 145 0 0 0 4.5 2.3l-1 .6.5.3 1-.7 1 .5.3-.4-1-.4 2.8-2V71l-3.2 2.5-4.4-2.3 4-3a134.5 134.5 0 0 0 3.9 2l.2-.2.5-.2-4.1-2 3.7-2.9a134 134 0 0 0 4.4 2l-3.5 3h.6c1.1-.9 2.3-1.8 3.3-2.8l4.6 2-3.5 3 1.8 1.6 2.7 1-.8.7.3.4 1-1 3.8 1.4.5.9-1.1 1 .4.3 1-.9 2.4 4c-.2 0-.3.2-.4.3l-2.6-.8c-.3 0-.5.1-.7.3l2.8.9-3.5 3 .2.5 3.9-3.3 1.1.3 2 3-2 1.7-5-1.5.2.6c1.4.5 2.9 1 4.3 1.3L100 90c.2 0 .4.2.5.3l2.7-2.3 3.9 1 .5 1.2-2.5 2.1.7.2 2-1.7c.4 1 .6 2.2.8 3.4l-1.2-.3s0 .3-.2.5l1.5.4.1 1-3.3 2.9-2-.6c0 .2-.2.3-.3.3v.2l1.8.5-2.5 2-.2.5h.4l3-2.3 3 .7a21 21 0 0 1-.7 3.3l-1.3 1-1-.3c0 .2-.1.4-.3.5l.8.2a182.5 182.5 0 0 1-3.1 2.7l-.5.5v.3l4.3-3.3.5.1a24.2 24.2 0 0 1-2.2 4.3l-2.7-.7v.5l2.4.7a29 29 0 0 1-3.3 4l-4.7-1.4v.4l.1.2 4.2 1.2a35 35 0 0 1-4.3 3.6l-1.3-.4-.3.3-.2-.5c-1.3-.3-2.6-.7-3.8-1.2a188.5 188.5 0 0 0 2.3-1.7Z
                            M42 100.1a32 32 0 0 0-.5-.4l-1.8.6 1 .3 1.3-.5ZM59.5 108.5l-.1-.3-.3-.5-1.6-1a13 13 0 0 1-1.9-.4l4 2.2ZM80 86.8l-.5-.3-.4.2-.1.7.5-.3.5-.3ZM37.5 100.4h.4l-.8-.7.4.7ZM47.4 112.9l-.7-.5.2.5h.5ZM47.5 81.7l-.3-.4-.7.2-1.7-1.3v.7l1.2.8-1 .4.2.5 1.3-.5 2.4 1.8.6-.2-2.5-1.8.5-.2ZM51.2 85.3l.2-.5-.1.1-1.6-1-.2.4 1.2.9-2 .8-.4.8a154.4 154.4 0 0 0 3-1.5ZM63.4 79.3l.8-.4.6-.4c.1-.2.3-.4.3-.7l-2.7 1.5h1ZM57.6 112.7l-.3-.1.3.1ZM58.1 101.2l-.4-.2-.2.5.5.3.1-.6ZM47.2 76.4l2.7 2-.1-.7-2.1-1.6 1.7-.8v-.5l-2.2 1-1.5-1.2-.2.4 1.2 1-2.1 1v.5l2.6-1.1ZM56.2 111.2l3.7-1.7-.2-.5a184 184 0 0 1-3.9 1.7l.4.5ZM83.9 119l-.3-.1-.2.5.6.2-.1-.6ZM76.7 118.6v-.6c-1 .5-1.7 1-2.6 1.3l.1.6 2.5-1.3ZM74.2 115c-.4 0-.7-.2-1-.4l.6-.4-.2-.5-1 .6.2.8 2 .8-.6-.8ZM74.9 113.7l1.7-1v-.6l-2.4 1.3.7.3ZM76.8 110.7l-.4-.2-.6-.4-2-.8a1.3 1.3 0 0 1-.4.4l3.4 1.4v-.4ZM84 120l-1.4.7-.5.6-.6.7 2.3-1.4.1-.7ZM45.5 106.2h.8l-.3-.3-1.7-1.1 1.1-.5-.1-.5-1.6.6-2.3-1.6-.6.2 2.3 1.6-3.2 1 .2.6 3.6-1.2 1.8 1.2ZM59.7 75.3l.2-.2a150.5 150.5 0 0 1-.2.2ZM72 109.3ZM77.3 122l-3-1.2v.6l3.2 1.3-.2-.7ZM74.7 104v.6l2.6 1.2-1.5.8.8.2 1.1-.6.3-.8c-1.2-.4-2.3-1-3.3-1.4ZM98.6 102l-.8-.2-.7.3.5.2c.4 0 .7-.2 1-.3ZM31.5 92.8l2-.6-.1-.5-2.4.7c.2 0 .3.2.5.4Z
                            m62.3 120.4 1.8-.7c.6-.2 1-.5 1.1-.8a40.8 40.8 0 0 1-1-1.3l-1.5-1.2c-.8.2-2.2.4-3.6-.8l-1.1-.8 1-.5-1.8-.8c-1.1-.5-1.1-1.6-2.8-2.9-.2.8-.5 1.4-.8 1.9l-.9 1.3c-.6 1-1.1 1.9-2 2-.3 0-1 0-1.9-2.2l-1.8.1.2 1-1.4-.5c-1.3-.6-2.5-.6-3.2 0-.7.7-1 2.4-1 3.8 1-.6 2-1.3 2.4-1.3.7.1 1.7.5 1.7.5l5.2 2.4c.1.3-.1 1.6-.8 3.2 2.7-.2 2.7-2.8 3.8-2.4 1.2.4 3.7.7 3.7.7s.5 1.1-.2 2.4c1.2-.3 3.2-2.2 3.2-2.2a16.5 16.5 0 0 0 3.4 0l-1.7-1ZM64 119a.7.7 0 1 1-1.3-.3.7.7 0 0 1 1.3.3ZM40.1 118.7l-.6-.9c-.3.3-.7.5-1 .6.4.4 1 .4 1.6.3ZM103 92.8l.4.8.2.3a.7.7 0 0 1 .2.5l.8 1.6-1.5-.9a.7.7 0 0 1-.5-.2l-.3-.2c-1.3-.7-3-1.3-4-1-.9.4-1.4 1.4-1.5 2.9l-.1 1.5-1.2-.9-.6-.6c-.6.9-1.2 1.4-1.7 1.8l-.8 1-1.4 4 2.8-.8c.2.1.4.4.6.9l1.9-.7c0-.7-.1-1.3.4-1.5 1.2-.4 3.3-1.7 3.3-1.7s1 .6 1.3 2h.2c.7-1.2 1-3.7 1-3.7.5-.1 4.4-3.5 4.1-4.1-.3-.6-1.9-.6-3.5-1Z
                            M86 76.4s-.8 1.8-1 3.2l.3.3c.7-.5 1.4-.7 1.7-.7l.8-1.3.5 2 .1 1.5.5.7c.8-.4 1.7-1.3 2.3-2.2l1.6-2.1v2.6c0 2.8-1 4-1.6 4.9H91l3.7 4 1 1.4c.1.3-.3 1.4-.5 2.6l1.3-.6-.7 1.8-.6 1.3.6.7c.2-1.8 1-3 2.1-3.5 1.4-.5 3.5.3 4.7 1-1.6-3.4-3.6-3.2-4-4-1-2.4-2-6.5-1.9-7.1.2-.7.7-2.7 3-2.8-2.9-2.7-4.2-1.8-5.3-3-1-1-4.5-4.7-6.1-5.3-1.6-.5-3-1.4-3.5-1.1-.6.3.9 5.3 1.2 5.7Zm.8-2.9a.7.7 0 1 1 1.2-.7.7.7 0 0 1-1.2.7ZM74.4 83.8c1 .1 2 0 2.5-1l1-1.8.6 1.8.6 2.3c1.3 1 4.8 3.3 6.5 3.7l.3-1a.7.7 0 0 1 .3-1v-.4l-.6-.8c-.8-.9-1.8-2.1-2-3.5 0-.5.1-1 .4-1.6l.3-.5-1.3-1.4c-1-.7 1.4-2 .2-4.5-1 1.4-2 2.3-2.4 2.3l-4.7-3.3s-.8-.6-1.3-1.2c-.4-.6.8-4.8-1.3-5.7.3 1.8-.3 3.2-1.3 3.9-1.3.8-3.5.4-4.8 0 2.3 3 4.2 2.4 4.7 3 1.4 2.2 3.3 6 3.3 6.7 0 .6-.2 2.7-2.3 3.3l1.3.7Z
                            M87.5 80c-.5.8-1.1 1.1-1.5 1.3.4.6 1 1 1.5 1 0-.7.2-1.7 0-2.3ZM40.8 118.2c0-1.3.2-3.6 1.3-4.6.9-.8 2.4-1 4-.2-.3-2.3-4.6-2.2-5-2.8-.5-.6-1-1.6-1-1.6l-1.8-5.4c.2-.3 1.3-1 2.9-1.6-2-1.9-4 0-4.4-1.1a6 6 0 0 0-.2-.4l-.5 1.1-.8-1.8c-.8-2-.8-3.3-.8-4.2l-1.7-.2c-.2-.5-4-4-4.5-3.7-.6.3-.4 2-.6 3.6-.3 1.7 1.4 6.6 1.9 8 .5 1.4-.9 2.2.2 6 1.1-2 3.2-1.5 3.8-1.4.7.1 3.8 3 5.5 5 .5.7-.6 2.3 1.7 5.3ZM29.7 95.7a.7.7 0 1 1-.7-1.2.7.7 0 0 1 .7 1.2ZM71 108.6a17 17 0 0 1-1-.8c-1 1.2-2.6.9-3.2.8-.7-.1-4-2.8-5.7-4.7-.6-.6.4-2.3-2-5.2 0 1.4 0 3.6-1 4.7a3 3 0 0 1-2.2.8l-.3 1.2c1.5.6 3.4.6 3.7 1 .5.6.9 1.5.9 1.5l2.1 5.3c0 .3-1.2 1-2.7 1.8 2.2 1.7 3.9-.3 4.4.8.6 1 2.3 3 2.3 3s-.5 1.2-1.9 1.7c1.2.6 4 .6 4 .6.1.4 4 3.8 4.6 3.4.6-.4.3-2 .4-3.7a27 27 0 0 0-2.3-7.8c-.6-1.2.3-2-.1-4.4Zm.4 12a.7.7 0 1 1 .8 1.1.7.7 0 0 1-.8-1.1ZM52 85.6l-.5.8.6-.2-.1-.6ZM57.5 98.7c-1.9 1.2-3.5-.2-4-.6-.5-.4-2-4.4-2.5-7 0-.5.6-1 1-2.4-.6-.2-1-.4-1.3-.7l-.2-.1c-.5.5-1.1 1-1.8 1.2a3 3 0 0 1-2.2-.4 22.2 22.2 0 0 1-1 .9c.5.1 1 .3 1.6.7l1.1.8-.7.4c.4.3.7.6.7.8V94l-.6 4.2c0 .2.2.4.4.6l1 .1c1.1.2 2.7.3 3.8 1.2.4.4.7.8.9 1.4l.3 1.4-1.4-.4c-1.4-.4-2.5-.3-3.2.4-.6.8-.7 2.6-.5 4l.4 2.6-1.8-1.8-.7-.8h-1.4c.6 1.1 3 2.6 3 2.6 0 .4 1.6 5.4 2.3 5.3.6 0 1.2-1.5 2.2-3 1-1.3 1.9-6.4 2-7.8.2-1.6 1.8-1.6 2.6-5.4Zm-6.8 12.8a.7.7 0 1 1 1.3-.1.7.7 0 0 1-1.3 0ZM38.2 83.6l-1.7-.2a33.7 33.7 0 0 1 1.4 1.2c.8 0 2.8 0 3.9.4l1.7.8-1.7.7c-.6.3-.9.6-1 .9l2 2.5.4-.1a6 6 0 0 1 1.4-.3c.6-1.4 2.2-1.1 3.7-4.6-2 .8-3.3-1-3.7-1.5-.4-.5-1-4.7-.9-7.3 0-.9 1.8-1.4 2.2-4.7l-.2-.2c-1 1-2.4 2.3-3.8 2.4-1.2 0-2.4-.9-3.2-2.5-1.3 1.9 2 4.7 2 5.4 0 .8-.4 1.8-.4 1.8l-2 5.3Z
                            m37.7 98.9.3.3c.3 0 .6-.2 1-.6-.4 0-.9 0-1.3.3Z
                            M36.1 99.5c.9-2 3-1.8 3.7-1.7.6 0 4 2.5 6 4.3.6.6-.3 2.4 2.3 5-.2-1.3-.3-3.5.7-4.6.8-1 2.3-1.3 4-.7-.5-2.3-4.9-1.7-5.4-2.2l-1-1.5-2.5-5.2c.1-.3 1.2-1.1 2.7-2-2.3-1.5-3.9.5-4.5-.5a25 25 0 0 0-2.4-2.9s.4-1.1 1.7-1.7c-1.1-.5-3.9-.4-3.9-.4-.2-.4-4.4-3.6-4.9-3.1-.5.4-.1 2-.2 3.7 0 1.7 2.1 6.3 2.8 7.6.7 1.4-.6 2.3 1 5.9ZM33.5 86a.7.7 0 1 1 1-.9.7.7 0 0 1-1 .9ZM78.8 115.8a7.2 7.2 0 0 1 4.8-2h.5l.9-.8c.2-.5.6-.8 1.1-1.3l1.3-1.4.9-1.8-.8.2c-.7.7-1.2 1.2-2 1.2-.3 0-1.4-.2-2-5.5v-.7c-.7-.5-2-1.8-2.5-2.9 0 .2-.2.3-.4.4 0 0-.2.2-.5.2 0 .5-.2.9-.2.9l-1.8 5.4c-.3.2-1.6 0-3.3-.5.6 2.8 3.1 2.4 2.9 3.6-.3 1.2-.3 3.7-.3 3.7s-1.1.6-2.5 0c.3 1 1.6 2.1 2.2 2.7l1.7-1.4ZM79.4 117.2l-2.1.2.2.2c-.2.5.6 5.6 1.3 5.7.6 0 1.5-1.4 2.7-2.6.5-.5 1-1.6 1.6-2.8-.8-.6-2.4-.8-3.7-.7Zm1.3 2.8a.7.7 0 1 1-1.3-.1.7.7 0 0 1 1.3.1ZM81.4 99.3l.6.3c.5.2.9.2 1.2.1l.2-.3c0-.9 0-2 .3-2.9l-.2-.1c-.7.5-1.4 1-2.1 1v2Z
                            M96.5 111.7c1.1-.6 3-2.2 3-2.2s1.2.5 1.7 1.9c.6-1.1.7-4 .7-4 .4-.1 3.8-4 3.5-4.6-.4-.5-2-.3-3.7-.4-1.7-.2-6.5 1.6-7.8 2.2-1 .4-1.8-.1-3.4 0l-1.2 2c.3 1 .1 1.8 0 2.2 0 .7-2.8 4-4.7 5.7-.6.5-2.3-.5-5.2 2 1.3-.2 3.6 0 4.6 1 .9.9 1 2.3.4 4 2.3-.3 2-4.7 2.6-5.2l1.6-.9 5.3-2c.3 0 1 1.2 1.7 2.7 1.8-2.1-.1-3.9 1-4.4Zm5.9-7.1a.7.7 0 1 1-.8-1.2.7.7 0 0 1 .8 1.2ZM73.8 105.2c.3-1.6-1-6-1.5-7.6-.4 0-.8-.2-1.1-.4l-1.7-.8 1.8-.7c.5-.2.9-.5 1-.8l-1.7-2.4a4 4 0 0 1-2 0 4 4 0 0 1-2.4-.9l-1-.8.6-.3-2.8-3.2c-.6-.6.6-2.3-1.6-5.3a9 9 0 0 1-.6 3.4c.1 1.4.2 3 0 4.1l.1.1c.5.6.8 1.6.8 1.6l1.7 5.5c-.1.3-1.3 1-2.9 1.5 2 1.9 4 .1 4.4 1.2.5 1.2 2 3.2 2 3.2s-.6 1.1-2 1.5c1 .7 3.8 1 3.8 1 .2.4 3.8 4.1 4.4 3.8.6-.4.4-2 .7-3.7Zm-2.2.6a.7.7 0 1 1 1.2-.7.7.7 0 0 1-1.2.7ZM45 68.7c0 2.3 4.2 3 4.6 3.7l.5 1.7.9 5.7c-.2.3-1.5.8-3.2 1 1.7 2.2 3.9.7 4.2 2 .3 1.1 1.4 3.4 1.4 3.4s-.7 1-2.2 1.1c1 .9 3.7 1.5 3.7 1.5 0 .5 3 4.8 3.7 4.5.6-.2.7-1.9 1.3-3.5.5-1.6-.2-6.7-.4-8-.2-1 .3-1.6.6-2.7v-.6l.2.1c.1-.7.2-1.6 0-2.8-1.4 1.7-3.3.8-4 .6-.5-.3-3.1-3.7-4.4-6-.4-.7 1-2.1-.7-5.5-.2 1.4-.8 3.5-2 4.3-1.1.7-2.6.5-4.1-.5Zm13.5 21.7a.7.7 0 1 1-.5-1.3.7.7 0 0 1 .5 1.3ZM88.3 106.5c1.2-1.2 3-6 3.3-7.4.5-1.5 2.1-1.3 3.5-4.9-2 .9-3.4-.8-3.8-1.3-.4-.5-1.2-4.6-1.3-7.2 0-1 1.9-1.6 1.9-5.3-.8 1-2.3 2.8-3.8 2.9-1.2 0-2.5-.8-3.4-2.4-1.1 2 2.4 4.6 2.3 5.4 0 .8-.3 1.8-.3 1.8L85 93.5c-.3.2-1.6 0-3.2-.5.5 2.7 3 2.4 2.8 3.6a25 25 0 0 0-.3 3.7s-1.1.6-2.5 0c.5 1.2 2.6 3 2.6 3-.1.5.6 5.7 1.3 5.7.7.1 1.5-1.3 2.7-2.5Zm-2.1-.9a.7.7 0 1 1 1.4.2.7.7 0 0 1-1.4-.2Z
                            M61.1 79.8c.5 2.3 4.8 2 5.3 2.6l1 1.5 2 5.3c0 .3-1.1 1.1-2.7 1.8 2.2 1.7 4-.3 4.5.8.6 1 2.2 3 2.2 3s-.5 1.2-1.8 1.7c1.1.6 3.9.6 3.9.6.2.4 4.1 3.8 4.7 3.4.5-.4.2-2 .4-3.7.1-1.7-1.8-6.5-2.3-7.7-.7-1.5.7-2.4-.6-6-1 2-3 1.6-3.7 1.5-.7 0-4-2.8-5.8-4.7-.5-.6.5-2.3-2-5.2.1 1.4 0 3.6-1 4.7-.9.9-2.3 1-4 .4Zm18.4 17a.7.7 0 1 1-1.1.8.7.7 0 0 1 1.1-.8ZM22.5 86.9a.4.4 0 1 0-.2-.8c-.8.2-1.4.6-1.8 1.3-.5 1-.2 2-.1 2a.4.4 0 1 0 .8-.2s-.3-.8 0-1.4c.3-.4.7-.7 1.3-1Z
                            M22 85.4a.4.4 0 1 0-.3-.9 4 4 0 0 0-2.7 1.9 4.1 4.1 0 0 0-.4 3 .4.4 0 0 0 .8-.3s-.3-1.2.3-2.3c.5-.7 1.2-1.2 2.2-1.4ZM37.4 124l1 .2c.6 0 1-.2 1-.2a.4.4 0 0 0-.3-.8s-.7.3-1.4 0c-.4-.2-.7-.6-1-1.2a.4.4 0 0 0-.8.3c.4.8.8 1.4 1.5 1.7Z
                            M34.8 122.5c-.3 0-.4.3-.3.5a4 4 0 0 0 2 2.6c.6.3 1.2.3 1.6.3.8 0 1.4-.2 1.4-.2.2 0 .3-.3.3-.5-.1-.2-.4-.4-.6-.3 0 0-1.2.4-2.3-.1-.7-.3-1.3-1-1.6-2 0-.3-.3-.4-.5-.3ZM106.5 115.7a.4.4 0 0 0 .2.8c.9-.3 1.5-.7 1.8-1.4.5-1 .1-2 .1-2a.4.4 0 0 0-.8.2s.3.8 0 1.4c-.3.5-.7.8-1.3 1Z
                            M107.3 118a4 4 0 0 0 2.7-2c.8-1.3.4-2.8.4-2.9-.1-.2-.4-.3-.6-.3-.2.1-.3.3-.3.6 0 0 .4 1.2-.2 2.3-.4.7-1.1 1.2-2.1 1.4a.4.4 0 0 0 0 .9ZM73.8 20.2c-.1.2 0 .5.2.6 0 0 .7.4 1 1 0 .5 0 1-.3 1.6a.4.4 0 0 0 .3.6c.2 0 .3 0 .4-.2.4-.8.5-1.5.3-2.2-.3-1-1.3-1.5-1.3-1.6a.4.4 0 0 0-.6.2Z
                            M76.3 24.6a.4.4 0 0 0 .6-.2 4 4 0 0 0 .6-3.2 4.1 4.1 0 0 0-1.8-2.3.4.4 0 1 0-.4.7s1 .6 1.4 1.8c.2.8 0 1.7-.5 2.6-.1.2 0 .4.1.6ZM101.4 73.2c0 .2.1.5.4.5 0 0 .7.2 1.1.8.3.4.3 1 .2 1.5a.4.4 0 0 0 .8.2c.2-.8.1-1.6-.2-2.2-.6-.9-1.7-1.1-1.8-1.1-.2 0-.4 0-.5.3Z
                            M105 76.8c.3 0 .4-.1.5-.3a4 4 0 0 0-.2-3.3 4.1 4.1 0 0 0-2.4-1.8c-.2 0-.4 0-.5.3 0 .2 0 .5.3.5 0 0 1.2.4 1.8 1.4.4.7.5 1.6.2 2.6 0 .3 0 .5.3.6ZM59 20.7a.4.4 0 1 0-.3-.8c-.8.4-1.3 1-1.5 1.7-.3 1 .2 2 .2 2a.4.4 0 0 0 .6.2c.2-.1.3-.4.2-.6 0 0-.4-.7-.2-1.4.2-.4.5-.8 1-1Z
                            M57.8 18.6a4 4 0 0 0-2.3 2.3c-.5 1.4.1 2.9.2 3a.4.4 0 0 0 .5.1c.3 0 .3-.3.2-.6 0 0-.5-1.1 0-2.3.2-.7.8-1.3 1.8-1.7a.4.4 0 1 0-.4-.8Z"/>
                  </g>
                  <defs>
                    <clipPath>
                      <path fill="#fff" d="M0 0H128V128H0z"/>
                    </clipPath>
                  </defs>
                </svg>
                <br/>
                На рыболовную сеть
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.SITES) {
      return (
        <>
          В Интернете мы можем с вами найти много разной информации: <Typist.Delay ms={1000} />смотреть мультфильмы<Typist.Delay ms={1000} />, читать книги<Typist.Delay ms={1000} />, играть в игры<Typist.Delay ms={1000} />, получать новые знания и находить ответы на свои вопросы.<Typist.Delay ms={1000} /><br/>
          <br/>
          Эта информация находится на сайтах.<Typist.Delay ms={1000} /> <span className={styles['highlight']}>Сайт</span> – это Интернет-ресурс, состоящий из одной или нескольких информационных страниц.<Typist.Delay ms={1000} /><br/>
          <br/>
          Есть полезные сайты<Typist.Delay ms={500} />, а есть опасные.<Typist.Delay ms={1000} /> Если вы зашли на сайт и появилось окно красного цвета<Typist.Delay ms={500} />, нужно сразу позвать родителей и не нажимать на него!<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_SITES) {
      return (
        <>
          Давайте решим задачу:<Typist.Delay ms={1000} /><br/>
          <br/>
          Вы заходите на сайт и появляется красное окошко на весь экран.<Typist.Delay ms={1000} /><br/>
          <br/>
          Что вы будете делать?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Нажму на красное окошко
              </AnswerButton>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Позову родителей
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Не буду обращать внимание на красное окошко
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.ACCOUNT) {
      return (
        <>
          В Интернете на многих сайтах нужно создавать <span className={styles['highlight']}>аккаунт</span><Typist.Delay ms={1000} /> – это ваш личный профиль, который позволяет пользоваться сайтом от вашего имени.<Typist.Delay ms={1000} /><br/>
          <br/>
          У каждого аккаунта есть <span className={styles['highlight']}>пароль</span><Typist.Delay ms={1000} /> – секретная информация, которую знаете только вы.<Typist.Delay ms={1000} /><br/>
          <br/>
          Не стоит использовать слишком простые пароли для своих аккаунтов в Интернете, потому что их очень легко взломать.<Typist.Delay ms={1000} /><br/>
          <br/>
          Придумайте такой пароль, который вы легко сможете запомнить.<Typist.Delay ms={1000} /><br/>
          Никому не сообщайте данные для входа в свой аккаунт.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_ACCOUNT_1) {
      return (
        <>
          У Коли день рождения <span className={styles['highlight']}>10.10.2010</span>.<Typist.Delay ms={3000} /> Он решил создать аккаунт в социальной сети.<Typist.Delay ms={1000} /><br/>
          <br/>
          Помогите Коле выбрать безопасный пароль:<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                12345
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Kolya2010
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                10102010
              </AnswerButton>
            </ContentButtons>
            <ContentButtons>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                6B9L0d53@23q
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                qwerty1234
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_ACCOUNT_2) {
      return (
        <>
          Саша создал аккаунт в компьютерной игре.<Typist.Delay ms={1000} /> Новый знакомый Саши попросил данные от его аккаунта<Typist.Delay ms={1000} />, чтобы поиграть в игру.<Typist.Delay ms={1000} /><br/>
          <br/>
          Что следует сделать Саше?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Сообщить данные в сообщении
              </AnswerButton>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Не сообщать данные
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Сообщить данные при личной встрече
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.COMMUNICATION) {
      return (
        <>
          А еще в Интернете можно общаться, но будьте осторожны!<Typist.Delay ms={1000} /> Вам могут написать совершенно незнакомые люди.<Typist.Delay ms={1000} /> В таких ситуациях стоит насторожиться!<Typist.Delay ms={1000} /><br/>
          <br/>
          Не рассказывайте никому информацию о себе и своей семье<Typist.Delay ms={1000} /> (например, адрес<Typist.Delay ms={1000} />, номер телефона<Typist.Delay ms={1000} />, фотографии).<Typist.Delay ms={1000} /><br/>
          <br/>
          Самое главное<Typist.Delay ms={1000} /> - если незнакомец приглашает вас на встречу в реальной жизни, то обязательно сообщите об этом родителям и ни в коем случае не идите на эту встречу в одиночку, потому что он может оказаться кем угодно и даже причинить вам вред.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_COMMUNICATION_1) {
      return (
        <>
          Новый друг Андрея, с которым он вчера познакомился в Интернете, попросил срочно сообщить такую информацию:<Typist.Delay ms={2000} /> номер телефона<Typist.Delay ms={1000} />, домашний адрес<Typist.Delay ms={1000} /> и кем работают родители Андрея.<Typist.Delay ms={1000} /><br/>
          <br/>
          Что должен сделать Андрей в этом случае?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Рассказать все новому другу
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Сказать только номер телефона
              </AnswerButton>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Рассказать обо всем родителям и ничего не сообщать незнакомцу
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_COMMUNICATION_2) {
      return (
        <>
          {/* TODO: стилизовать письмо */}
          Вы получили электронное письмо:<Typist.Delay ms={1000} /> «Дорогой друг! Мне нравятся твои комментарии.<Typist.Delay ms={1000} /> Видно, что ты умный и добрый человек.<Typist.Delay ms={1000} /> Давай встретимся сегодня в парке в 5 часов вечера.<Typist.Delay ms={1000} /> У меня в руках будет игрушечный медвежонок.<Typist.Delay ms={1000} /> До встречи!<Typist.Delay ms={1000} /> Никому не сообщай о встрече!<Typist.Delay ms={1000} /> Это наш маленький секрет».<Typist.Delay ms={1000} /><br/>
          <br/>
          Что вы будете делать?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Пойду на встречу один
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Проигнорирую сообщение
              </AnswerButton>
              {/* TODO: пойду на встречу с другом? */}
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Скажу об этом родителям
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.BULLING) {
      return (
        <>
          При общении в Интернете вы можете встретиться с людьми, которые будут агрессивны к вам и могут оскорблять вас.<Typist.Delay ms={1000} /> Это называется <span className={styles['highlight']}>кибербуллинг</span>.<Typist.Delay ms={1000} /> Вам не стоит общаться с такими людьми и тем более отвечать им тем же.<Typist.Delay ms={1000} /> Лучший способ испортить хулигану его выходку<Typist.Delay ms={1000} /> – отвечать ему полным игнорированием.<Typist.Delay ms={1000} /><br/>
          <br/>
          Если у вас есть информация, что кто-то оскорбляет ваших друзей или знакомых, то сообщите об этом классному руководителю или школьному психологу – необходимо принять меры по защите ребенка.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_BULLING) {
      return (
        <>
          Никита высказал свое мнение в комментариях.<Typist.Delay ms={1000} /> Один незнакомец был не согласен с мнением Никиты и начал агрессивно доказывать свою точку зрения<Typist.Delay ms={1000} />, оскорбляя Никиту.<Typist.Delay ms={1000} /><br/>
          <br/>
          Что нужно сделать Никите?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Ответить оскорблениями в ответ
              </AnswerButton>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Игнорировать незнакомца
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Продолжать отстаивать свою точку зрения
              </AnswerButton>
            </ContentButtons>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Позвать друзей на помощь
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.LOGOUT) {
      return (
        <>
          Иногда бывают такие ситуации<Typist.Delay ms={1000} />, когда вам придется использовать Интернет с чужого компьютера или смартфона.<Typist.Delay ms={1000} /><br/>
          <br/>
          Не забывайте выходить из своего аккаунта в социальной сети, почты и на других сайтах после завершения работы.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_LOGOUT) {
      return (
        <>
          Миша попросил у своего знакомого телефон<Typist.Delay ms={1000} />, чтобы прочитать сообщения в почте.<Typist.Delay ms={1000} /> После работы, он забыл выйти из аккаунта.<Typist.Delay ms={1000} /><br/>
          <br/>
          Что может произойти с аккаунтом Миши?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Аккаунт удалят
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Сменят пароль от аккаунта
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Начнут отправлять разные сообщения всем людям
              </AnswerButton>
            </ContentButtons>
            <ContentButtons>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Все вышеперечисленное
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.VIRUSES) {
      return (
        <>
          Как и в любом обществе<Typist.Delay ms={500} />, в Интернете есть свои опасности, и одна из этих опасностей – <span className={styles['highlight']}>вирусы</span>.<Typist.Delay ms={1000} /> Они могут нанести огромный вред вашему компьютеру или смартфону<Typist.Delay ms={1000} />, раскрыть вашу личную информацию<Typist.Delay ms={1000} /> (например, фотографии<Typist.Delay ms={1500} />, пароль от почты<Typist.Delay ms={1000} />, данные банковских карт).<Typist.Delay ms={1000} /><br/>
          <br/>
          Никогда не скачивайте и не запускайте файлы из сообщений, полученных от подозрительных и неизвестных вам людей.<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_VIRUSES) {
      return (
        <>
          Антон создал себе электронный ящик.<Typist.Delay ms={1000} /> Теперь он может обмениваться сообщениями со своими друзьями.<Typist.Delay ms={1000} /> Сегодня на адрес его электронной почты пришло сообщение<Typist.Delay ms={1000} />, содержащее файл с игрой от незнакомца.<Typist.Delay ms={1000} /><br/>
          <br/>
          Как поступить Антону?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Скачать файл и запустить его
              </AnswerButton>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Не скачивать файл
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Отправить файл своим друзьям
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QR_CODES) {
      return (
        <>
          В нашем мире существует много интересных информационных технологий.<Typist.Delay ms={1000} /> И одна из них – это <span className={styles['highlight']}>QR-код</span>.<Typist.Delay ms={1000} /><br/>
          <br/>
          QR-код это рисунок, который можно отсканировать с помощью смартфона<Typist.Delay ms={500} />, чтобы быстро получить доступ к информации.<Typist.Delay ms={1000} /><br/>
          <br/>
          С помощью QR-кода можно: <Typist.Delay ms={1000} />посмотреть рекламу<Typist.Delay ms={1000} />, оплатить товары в магазине<Typist.Delay ms={1000} />, открыть сайт<Typist.Delay ms={1000} />, и другое.<Typist.Delay ms={1000} /><br/>
          <br/>
          Но будьте осторожны!<Typist.Delay ms={1000} /> В QR-коде может оказаться и небезопасная для вас информация!<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QUESTION_QR_CODES) {
      return (
        <>
          Коля навел камеру смартфона на QR-код<Typist.Delay ms={500} />, отсканировал его и перешел по ссылке внутри<Typist.Delay ms={1000} />, после чего открылся сайт с красным окошком.<Typist.Delay ms={1000} /><br/>
          <br/>
          Как поступить Коле?<Typist.Delay ms={1000} />
          <Typist.Paste>
            <ContentButtons>
              <AnswerButton isCorrect={false}>
                Нажать на красное окошко
              </AnswerButton>
              <AnswerButton isCorrect={true} onAnimationEnd={goToNextStep}>
                Позвать родителей
              </AnswerButton>
              <AnswerButton isCorrect={false}>
                Не обращать внимание на красное окошко
              </AnswerButton>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.SCAN_QR_CODE) {
      return (
        <>
          Ребята, давайте потренируемся использовать QR-код.<Typist.Delay ms={1000} /><br/>
          <br/>
          Доставайте свои смартфоны, наводите на данный QR-код, нажимайте на всплывающую ссылку и посмотрите, что у вас получится!<Typist.Delay ms={1000} />
          <Typist.Paste>
            <div className={styles['qr-container']}>
              <img className={styles['qr']} src="data:image/gif;base64,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" alt="QR-код" />
            </div>
            <ContentButtons>
              <Button onClick={goToNextStep}>
                Далее
              </Button>
            </ContentButtons>
          </Typist.Paste>
        </>
      );
    }

    if (step === Step.QR_CODE_SCANNED) {
      return (
        <>
          Молодцы!<Typist.Delay ms={1000} /><br/>
          <br/>
          Ребята<Typist.Delay ms={500} />, я вас поздравляю!<Typist.Delay ms={1000} /> Вы прошли все мои задания и научились правильно пользоваться Интернетом.<Typist.Delay ms={1000} /> Я надеюсь<Typist.Delay ms={500} />, что вы будете вспоминать правила и тогда время, проведенное в Интернете, будет приносить вам радость, знания и хорошее настроение!<Typist.Delay ms={1000} /><br/>
          <br/>
          До свидания, до скорых встреч!
        </>
      );
    }

    return '';
  };

  return (
    <>
      <div className={styles['app'] + ' ' + ((step === Step.START) ? styles['app__start'] : '')}>
        <Background />
        <div className={styles['app_content']}>
          <Content key={step} onTypingDone={onTypingDone}>
            {renderContent()}
          </Content>
          {(step > Step.START) ? (
            <Robot isGreeting={step === Step.GREETING} isTalking={isTalking} />
          ) : null}
        </div>
        <div className={styles['app_copyright']}>
          <a onClick={showCopyrightInformation}>©</a>
        </div>
        <div className={styles['copyright'] + ' ' + ((isCopyrightInformationVisible) ? styles['copyright__visible'] : '')}>
          <div className={styles['copyright_close']}>
            <a onClick={hideCopyrightInformation}>✖</a>
          </div>
          <div className={styles['copyright_content']}>
            Некоторые ресурсы, использованные при создании этой игры, взяты из открытых источников.<br/>
            <br/>
            Мы выражаем благодарность авторам этих ресурсов:<br/>
            <br/>
            Изображение паутины: <a href="https://www.svgrepo.com/svg/55672/spider-web" target="_blank">https://www.svgrepo.com/svg/55672/spider-web</a><br/>
            <br/>
            Изображение москитной сетки: <a href="https://thenounproject.com/icon/mosquito-net-3651002" target="_blank">https://thenounproject.com/icon/mosquito-net-3651002</a><br/>
            <br/>
            Изображение рыболовной сети: <a href="https://thenounproject.com/icon/fish-net-2760122" target="_blank">https://thenounproject.com/icon/fish-net-2760122</a><br/>
            <br/>
            Изображение робота: <a href="https://www.figma.com/community/file/918948005672594908" target="_blank">https://www.figma.com/community/file/918948005672594908</a><br/>
            <br/>
            Все остальные материалы, использованные в игре, являются интеллектуальной собственностью авторов.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
