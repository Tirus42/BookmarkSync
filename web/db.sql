--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Debian 11.5-1+deb10u1)
-- Dumped by pg_dump version 11.5 (Debian 11.5-1+deb10u1)

-- Started on 2019-09-22 20:21:21 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 593 (class 1247 OID 24658)
-- Name: changetype_t; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.changetype_t AS ENUM (
    'add',
    'remove',
    'move',
    'update'
);


SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 24671)
-- Name: changeset; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.changeset (
    id bigint NOT NULL,
    commitdate timestamp without time zone NOT NULL,
    changetype public.changetype_t NOT NULL,
    change json NOT NULL
);


--
-- TOC entry 196 (class 1259 OID 24647)
-- Name: seq_changeset; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seq_changeset
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2780 (class 2606 OID 24678)
-- Name: changeset ChangeSet_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.changeset
    ADD CONSTRAINT "ChangeSet_pk" PRIMARY KEY (id);


-- Completed on 2019-09-22 20:21:22 CEST

--
-- PostgreSQL database dump complete
--

