--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.11
-- Dumped by pg_dump version 9.3.11
-- Started on 2016-02-23 08:29:38 PST

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
-- TOC entry 194 (class 1259 OID 16818)
-- Name: fund_base; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE fund_base (
    fund_type character varying NOT NULL,
    fund_type_desc character varying
);


ALTER TABLE public.fund_base OWNER TO tnv;

--
-- TOC entry 2036 (class 0 OID 16818)
-- Dependencies: 194
-- Data for Name: fund_base; Type: TABLE DATA; Schema: public; Owner: tnv
--

INSERT INTO fund_base VALUES ('TF2', 'Trust Fund');
INSERT INTO fund_base VALUES ('MF', 'Management Fund');
INSERT INTO fund_base VALUES ('FCAS', 'Foreign Currency Account System');
INSERT INTO fund_base VALUES ('RP', 'Revolving Funds (Public Enterprise)');
INSERT INTO fund_base VALUES ('TF', 'Trust Funds');
INSERT INTO fund_base VALUES ('GF', 'General Fund');
INSERT INTO fund_base VALUES ('RG', 'Revolving Funds (Intragovernmental)');
INSERT INTO fund_base VALUES ('CF', 'Clearing Accounts');
INSERT INTO fund_base VALUES ('SF', 'Special Fund');
INSERT INTO fund_base VALUES ('DF', 'Deposit Fund');
INSERT INTO fund_base VALUES ('CSGL', 'Central Summary General Ledger');
INSERT INTO fund_base VALUES ('TRF', 'Trust Revolving Funds');
INSERT INTO fund_base VALUES ('MISC', 'Miscellaneous');
INSERT INTO fund_base VALUES ('CWF', 'Consolidated Working Fund');


--
-- TOC entry 1928 (class 2606 OID 16825)
-- Name: fund_base_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY fund_base
    ADD CONSTRAINT fund_base_pkey PRIMARY KEY (fund_type);


-- Completed on 2016-02-23 08:29:38 PST

--
-- PostgreSQL database dump complete
--

