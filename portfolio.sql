-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 24 2022 г., 01:07
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `portfolio`
--

-- --------------------------------------------------------

--
-- Структура таблицы `additional_information`
--

CREATE TABLE `additional_information` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tel` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `additional_information`
--

INSERT INTO `additional_information` (`id`, `id_user`, `tel`) VALUES
(1, 1, '+40796473675'),
(2, 8, '+10446123675');

-- --------------------------------------------------------

--
-- Структура таблицы `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_document` varchar(100) NOT NULL,
  `year` date NOT NULL,
  `document` varchar(100) NOT NULL,
  `type_document` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `document`
--

INSERT INTO `document` (`id`, `id_user`, `name_document`, `year`, `document`, `type_document`) VALUES
(1, 1, 'Программирование на PHP', '2020-09-01', '', 'Курсовая'),
(2, 1, 'АИС Колледж', '2019-01-10', '', 'ВКР'),
(3, 1, 'Рекомендация от ИП \'Антоненко А. С.\'', '2021-01-28', '', 'Рекомендация'),
(4, 1, 'Отчёт по выполнению ТЗ', '2022-01-06', '', 'Портфолио');

-- --------------------------------------------------------

--
-- Структура таблицы `education`
--

CREATE TABLE `education` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `institution` varchar(100) NOT NULL,
  `speciality` varchar(100) NOT NULL,
  `start_year` year(4) NOT NULL,
  `end_year` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `education`
--

INSERT INTO `education` (`id`, `id_user`, `institution`, `speciality`, `start_year`, `end_year`) VALUES
(1, 1, 'МБУ “Гимназия №30”', '', 0000, 2015),
(2, 1, 'Тольяттинский государственный университет', 'Прикладная информатика', 2020, 2024);

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name_event` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`id`, `name_event`, `description`, `date`, `role`) VALUES
(1, 'Событие 1', 'Так то так то...', '2022-01-20 03:09:35', '0,1'),
(2, 'Событие 2', 'Так то так то...', '2022-01-20 00:00:59', '1'),
(3, 'Событие 3', 'Так то так то...', '2022-01-18 00:00:00', '0');

-- --------------------------------------------------------

--
-- Структура таблицы `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `message`
--

INSERT INTO `message` (`id`) VALUES
(1),
(4);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `id_message`, `id_user`, `message`, `date`) VALUES
(1, 1, 1, 'Сообщение 1', '2022-01-19 00:24:00'),
(2, 1, 2, 'Привет', '2022-01-27 00:00:00'),
(3, 4, 1, '4 Месенджер', '2022-01-20 00:00:00'),
(4, 1, 1, 'fdfsfsfs', '2022-01-20 00:55:00');

-- --------------------------------------------------------

--
-- Структура таблицы `quality`
--

CREATE TABLE `quality` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_quality` varchar(100) NOT NULL,
  `quality` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `quality`
--

INSERT INTO `quality` (`id`, `id_user`, `name_quality`, `quality`) VALUES
(1, 1, 'Языки', 'английский, немецкий, китайский, японский'),
(2, 1, 'Навыки', 'Владение компьютером на проф. уровне');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `mail`, `password`, `role`) VALUES
(1, 'Андрей', 'Антоненко', 'a.a.s@mail.ru', 'qwerty', 1),
(2, 'Иван', 'Иванов', 'i.i@gmail.com', '12345', 0),
(5, 'Михаил', 'Зубенко', 'zubenko@mail.ru', 'qwerty12345', 0),
(9, '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `work`
--

CREATE TABLE `work` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_work` varchar(100) NOT NULL,
  `name_company` varchar(100) NOT NULL,
  `year_start` year(4) NOT NULL,
  `year_end` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `work`
--

INSERT INTO `work` (`id`, `id_user`, `name_work`, `name_company`, `year_start`, `year_end`) VALUES
(1, 1, 'Инженер', 'ООО “Тольятти Азот”', 2019, 0000),
(2, 1, 'PHP программист', 'ООО “Каракатица”', 2007, 2019);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `additional_information`
--
ALTER TABLE `additional_information`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `quality`
--
ALTER TABLE `quality`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Индексы таблицы `work`
--
ALTER TABLE `work`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `additional_information`
--
ALTER TABLE `additional_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `education`
--
ALTER TABLE `education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `quality`
--
ALTER TABLE `quality`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `work`
--
ALTER TABLE `work`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
