--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.11
-- Dumped by pg_dump version 9.3.11
-- Started on 2016-02-22 15:57:57 PST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 195 (class 1259 OID 16831)
-- Name: account_base; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE account_base (
    acct_type character varying NOT NULL,
    acct_type_desc character varying
);


ALTER TABLE public.account_base OWNER TO tnv;

--
-- TOC entry 2036 (class 0 OID 16831)
-- Dependencies: 195
-- Data for Name: account_base; Type: TABLE DATA; Schema: public; Owner: tnv
--

INSERT INTO account_base VALUES ('AVAIL', 'Available Receipt');
INSERT INTO account_base VALUES ('EXPND', 'Expenditure');
INSERT INTO account_base VALUES ('UAPPR', 'Unappropriated Receipt');
INSERT INTO account_base VALUES ('URCPT', 'Unavailable Receipt');
INSERT INTO account_base VALUES ('CXPND', 'Clearing Accounts');


--
-- TOC entry 1928 (class 2606 OID 16838)
-- Name: account_base_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY account_base
    ADD CONSTRAINT account_base_pkey PRIMARY KEY (acct_type);


-- Completed on 2016-02-22 15:57:57 PST

--
-- PostgreSQL database dump complete
--

