--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.11
-- Dumped by pg_dump version 9.3.11
-- Started on 2016-02-21 19:15:48 PST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 1 (class 3079 OID 11761)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2058 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 16675)
-- Name: agency_code; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE agency_code (
    agency integer NOT NULL,
    name character varying
);


ALTER TABLE public.agency_code OWNER TO tnv;

--
-- TOC entry 191 (class 1259 OID 16795)
-- Name: all_tas_betc; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE all_tas_betc (
    ata character varying,
    aid integer,
    bpoa integer,
    epoa integer,
    a character varying,
    main integer,
    sub integer,
    admin_bureau integer,
    gwa_tas character varying,
    gwa_tas_name character varying,
    agency_name character varying,
    betc character varying,
    betc_name character varying,
    effective_date date,
    suspend_date date,
    iscredit integer,
    adj_betc character varying,
    star_tas character varying,
    star_dept_reg integer,
    star_dept_xfer integer,
    star_main_acct integer,
    txn_type character varying,
    acct_type character varying,
    acct_type_desc character varying,
    fund_type character varying,
    fund_type_desc character varying
);


ALTER TABLE public.all_tas_betc OWNER TO tnv;

--
-- TOC entry 190 (class 1259 OID 16786)
-- Name: authority_tas_betc; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE authority_tas_betc (
    ata character varying,
    aid integer,
    bpoa integer,
    epoa integer,
    a character varying,
    main integer,
    sub integer,
    admin_bureau integer,
    gwa_tas character varying,
    gwa_tas_name character varying,
    agency_name character varying,
    betc character varying,
    betc_name character varying,
    effective_date date,
    suspend_date date,
    iscredit integer,
    adj_betc character varying,
    star_tas character varying,
    star_dept_reg integer,
    star_dept_xfer integer,
    star_main_acct integer,
    txn_type character varying,
    acct_type character varying,
    acct_type_desc character varying,
    fund_type character varying,
    fund_type_desc character varying
);


ALTER TABLE public.authority_tas_betc OWNER TO tnv;

--
-- TOC entry 179 (class 1259 OID 16653)
-- Name: ba1; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE ba1 (
    agency_code integer,
    agency_name character varying,
    bureau_code integer,
    bureau_name character varying,
    account_code integer,
    account_name character varying,
    treasury_agency_code integer,
    subfunction_code integer,
    subfunction_title character varying,
    bea_category character varying,
    on_off_budget character varying,
    y1976 integer,
    tq integer,
    y2016 integer,
    y2017 integer,
    y2018 integer,
    y2019 integer,
    y2020 integer,
    y2021 integer
);


ALTER TABLE public.ba1 OWNER TO tnv;

--
-- TOC entry 2059 (class 0 OID 0)
-- Dependencies: 179
-- Name: TABLE ba1; Type: COMMENT; Schema: public; Owner: tnv
--

COMMENT ON TABLE ba1 IS 'budauth where y2015 not null';


--
-- TOC entry 180 (class 1259 OID 16665)
-- Name: ba2; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE ba2 (
    agency_code integer,
    agency_name character varying,
    bureau_code integer,
    bureau_name character varying,
    account_code integer,
    account_name character varying,
    treasury_agency_code integer,
    subfunction_code integer,
    subfunction_title character varying,
    bea_category character varying,
    on_off_budget character varying,
    y1976 integer,
    tq integer,
    y2016 integer,
    y2017 integer,
    y2018 integer,
    y2019 integer,
    y2020 integer,
    y2021 integer
);


ALTER TABLE public.ba2 OWNER TO tnv;

--
-- TOC entry 176 (class 1259 OID 16577)
-- Name: bea_category; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE bea_category (
    bea_catagory integer NOT NULL,
    bea_name character varying NOT NULL
);


ALTER TABLE public.bea_category OWNER TO tnv;

--
-- TOC entry 175 (class 1259 OID 16575)
-- Name: bea_category_bea_catagory_seq; Type: SEQUENCE; Schema: public; Owner: tnv
--

CREATE SEQUENCE bea_category_bea_catagory_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bea_category_bea_catagory_seq OWNER TO tnv;

--
-- TOC entry 2060 (class 0 OID 0)
-- Dependencies: 175
-- Name: bea_category_bea_catagory_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tnv
--

ALTER SEQUENCE bea_category_bea_catagory_seq OWNED BY bea_category.bea_catagory;


--
-- TOC entry 171 (class 1259 OID 16386)
-- Name: budauth; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE budauth (
    agency_code integer,
    agency_name character varying,
    bureau_code integer,
    bureau_name character varying,
    account_code integer,
    account_name character varying,
    treasury_agency_code integer,
    subfunction_code integer,
    subfunction_title character varying,
    bea_category character varying,
    on_off_budget character varying,
    y1976 integer,
    tq integer,
    y1977 integer,
    y1978 integer,
    y1979 integer,
    y1980 integer,
    y1981 integer,
    y1982 integer,
    y1983 integer,
    y1984 integer,
    y1985 integer,
    y1986 integer,
    y1987 integer,
    y1988 integer,
    y1989 integer,
    y1990 integer,
    y1991 integer,
    y1992 integer,
    y1993 integer,
    y1994 integer,
    y1995 integer,
    y1996 integer,
    y1997 integer,
    y1998 integer,
    y1999 integer,
    y2000 integer,
    y2001 integer,
    y2002 integer,
    y2003 integer,
    y2004 integer,
    y2005 integer,
    y2006 integer,
    y2007 integer,
    y2008 integer,
    y2009 integer,
    y2010 integer,
    y2011 integer,
    y2012 integer,
    y2013 integer,
    y2014 integer,
    y2015 integer,
    y2016 integer,
    y2017 integer,
    y2018 integer,
    y2019 integer,
    y2020 integer,
    y2021 integer
);


ALTER TABLE public.budauth OWNER TO tnv;

--
-- TOC entry 178 (class 1259 OID 16606)
-- Name: budget; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE budget (
    budget_key integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.budget OWNER TO tnv;

--
-- TOC entry 172 (class 1259 OID 16405)
-- Name: bureau_code; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE bureau_code (
    agency integer NOT NULL,
    bureau integer NOT NULL,
    name character varying
);


ALTER TABLE public.bureau_code OWNER TO tnv;

--
-- TOC entry 188 (class 1259 OID 16762)
-- Name: collection_tas_betc; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE collection_tas_betc (
    ata integer,
    aid integer,
    bpoa integer,
    epoa integer,
    a character varying,
    main integer,
    sub integer,
    admin_bureau integer,
    gwa_tas character varying,
    gwa_tas_name character varying,
    agency_name character varying,
    betc character varying,
    betc_name character varying,
    effective_date date,
    suspend_date date,
    iscredit integer,
    adj_betc character varying,
    star_tas character varying,
    star_dept_reg integer,
    star_dept_xfer integer,
    star_main_acct integer,
    txn_type character varying,
    acct_type character varying,
    acct_type_desc character varying,
    fund_type character varying,
    fund_type_desc character varying
);


ALTER TABLE public.collection_tas_betc OWNER TO tnv;

--
-- TOC entry 184 (class 1259 OID 16713)
-- Name: func_amt; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE func_amt (
    func integer NOT NULL,
    subfunc integer,
    detail integer,
    on_off_budget integer,
    name character varying,
    y1962 integer,
    y1963 integer,
    y1964 integer,
    y1965 integer,
    y1966 integer,
    y1967 integer,
    y1968 integer,
    y1969 integer,
    y1970 integer,
    y1971 integer,
    y1972 integer,
    y1973 integer,
    y1974 integer,
    y1975 integer,
    y1976 integer,
    tq integer,
    y1977 integer,
    y1978 integer,
    y1979 integer,
    y1980 integer,
    y1981 integer,
    y1982 integer,
    y1983 integer,
    y1984 integer,
    y1985 integer,
    y1986 integer,
    y1987 integer,
    y1988 integer,
    y1989 integer,
    y1990 integer,
    y1991 integer,
    y1992 integer,
    y1993 integer,
    y1994 integer,
    y1995 integer,
    y1996 integer,
    y1997 integer,
    y1998 integer,
    y1999 integer,
    y2000 integer,
    y2001 integer,
    y2002 integer,
    y2003 integer,
    y2004 integer,
    y2005 integer,
    y2006 integer,
    y2007 integer,
    y2008 integer,
    y2009 integer,
    y2010 integer,
    y2011 integer,
    y2012 integer,
    y2013 integer,
    y2014 integer,
    y2015 integer,
    y2016_est integer,
    y2017_est integer,
    y2018_est integer,
    y2019_est integer,
    y2020_est integer,
    y2021_est integer
);


ALTER TABLE public.func_amt OWNER TO tnv;

--
-- TOC entry 185 (class 1259 OID 16727)
-- Name: func_code; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE func_code (
    func integer NOT NULL,
    subfunc integer NOT NULL,
    detail integer NOT NULL,
    name character varying
);


ALTER TABLE public.func_code OWNER TO tnv;

--
-- TOC entry 177 (class 1259 OID 16592)
-- Name: grant; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE "grant" (
    grant_key integer NOT NULL,
    name character varying
);


ALTER TABLE public."grant" OWNER TO tnv;

--
-- TOC entry 187 (class 1259 OID 16747)
-- Name: ipc_tas_betc; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE ipc_tas_betc (
    ata character varying,
    aid integer,
    bpoa integer,
    epoa integer,
    a character varying,
    main integer,
    sub integer,
    admin_bureau integer,
    gwa_tas character varying,
    gwa_tas_name character varying,
    agency_name character varying,
    betc character varying,
    betc_name character varying,
    effective_date date,
    suspend_date date,
    iscredit integer,
    adj_betc character varying,
    star_tas character varying,
    star_dept_reg integer,
    star_dept_xfer integer,
    star_main_acct integer,
    txn_type character varying,
    acct_type character varying,
    acct_type_desc character varying,
    fund_type character varying,
    fund_type_desc character varying
);


ALTER TABLE public.ipc_tas_betc OWNER TO tnv;

--
-- TOC entry 189 (class 1259 OID 16777)
-- Name: ntdopayment_tas_betc; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE ntdopayment_tas_betc (
    ata character varying,
    aid integer,
    bpoa integer,
    epoa integer,
    a character varying,
    main integer,
    sub integer,
    admin_bureau integer,
    gwa_tas character varying,
    gwa_tas_name character varying,
    agency_name character varying,
    betc character varying,
    betc_name character varying,
    effective_date date,
    suspend_date date,
    iscredit integer,
    adj_betc character varying,
    star_tas character varying,
    star_dept_reg integer,
    star_dept_xfer integer,
    star_main_acct integer,
    txn_type character varying,
    acct_type character varying,
    acct_type_desc character varying,
    fund_type character varying,
    fund_type_desc character varying
);


ALTER TABLE public.ntdopayment_tas_betc OWNER TO tnv;

--
-- TOC entry 183 (class 1259 OID 16702)
-- Name: o1; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE o1 (
    agency_code integer,
    agency_name character varying,
    bureau_code integer,
    bureau_name character varying,
    account_code integer,
    account_name character varying,
    treasury_agency_code integer,
    subfunction_code integer,
    subfunction_title character varying,
    bea_category character varying,
    grant_split character varying,
    on_off_budget character varying,
    y1962 integer,
    tq integer,
    y2015 integer,
    y2016 integer,
    y2017 integer,
    y2018 integer,
    y2019 integer,
    y2020 integer,
    y2021 integer
);


ALTER TABLE public.o1 OWNER TO tnv;

--
-- TOC entry 173 (class 1259 OID 16412)
-- Name: outlay; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE outlay (
    agency_code integer,
    agency_name character varying,
    bureau_code integer,
    bureau_name character varying,
    account_code integer,
    account_name character varying,
    treasury_agency_code integer,
    subfunction_code integer,
    subfunction_title character varying,
    bea_category character varying,
    grant_split character varying,
    on_off_budget character varying,
    y1962 integer,
    y1963 integer,
    y1964 integer,
    y1965 integer,
    y1966 integer,
    y1967 integer,
    y1968 integer,
    y1969 integer,
    y1970 integer,
    y1971 integer,
    y1972 integer,
    y1973 integer,
    y1974 integer,
    y1975 integer,
    y1976 integer,
    tq integer,
    y1977 integer,
    y1978 integer,
    y1979 integer,
    y1980 integer,
    y1981 integer,
    y1982 integer,
    y1983 integer,
    y1984 integer,
    y1985 integer,
    y1986 integer,
    y1987 integer,
    y1988 integer,
    y1989 integer,
    y1990 integer,
    y1991 integer,
    y1992 integer,
    y1993 integer,
    y1994 integer,
    y1995 integer,
    y1996 integer,
    y1997 integer,
    y1998 integer,
    y1999 integer,
    y2000 integer,
    y2001 integer,
    y2002 integer,
    y2003 integer,
    y2004 integer,
    y2005 integer,
    y2006 integer,
    y2007 integer,
    y2008 integer,
    y2009 integer,
    y2010 integer,
    y2011 integer,
    y2012 integer,
    y2013 integer,
    y2014 integer,
    y2015 integer,
    y2016 integer,
    y2017 integer,
    y2018 integer,
    y2019 integer,
    y2020 integer,
    y2021 integer
);


ALTER TABLE public.outlay OWNER TO tnv;

--
-- TOC entry 186 (class 1259 OID 16737)
-- Name: payment_tas_betc; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE payment_tas_betc (
    ata character varying,
    aid integer,
    bpoa integer,
    epoa integer,
    a character varying,
    main integer,
    sub integer,
    admin_bureau integer,
    gwa_tas character varying,
    gwa_tas_name character varying,
    agency_name character varying,
    betc character varying,
    betc_name character varying,
    effective_date date,
    suspend_date date,
    iscredit integer,
    adj_betc character varying,
    star_tas character varying,
    star_dept_reg integer,
    star_dept_xfer integer,
    star_main_acct integer,
    txn_type character varying,
    acct_type character varying,
    acct_type_desc character varying,
    fund_type character varying,
    fund_type_desc character varying
);


ALTER TABLE public.payment_tas_betc OWNER TO tnv;

--
-- TOC entry 2061 (class 0 OID 0)
-- Dependencies: 186
-- Name: TABLE payment_tas_betc; Type: COMMENT; Schema: public; Owner: tnv
--

COMMENT ON TABLE payment_tas_betc IS 'payment_tas_betc';


--
-- TOC entry 174 (class 1259 OID 16424)
-- Name: reciept; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE reciept (
    source_category_code integer,
    source_category_name character varying,
    source_subcategory integer,
    source_subcategory_name character varying,
    agency_code integer,
    agency_name character varying,
    bureau_code integer,
    bureau_name character varying,
    account_code integer,
    account_name character varying,
    treasury_agency_code integer,
    on_off_budget character varying,
    y1962 integer,
    y1963 integer,
    y1964 integer,
    y1965 integer,
    y1966 integer,
    y1967 integer,
    y1968 integer,
    y1969 integer,
    y1970 integer,
    y1971 integer,
    y1972 integer,
    y1973 integer,
    y1974 integer,
    y1975 integer,
    y1976 integer,
    tq integer,
    y1977 integer,
    y1978 integer,
    y1979 integer,
    y1980 integer,
    y1981 integer,
    y1982 integer,
    y1983 integer,
    y1984 integer,
    y1985 integer,
    y1986 integer,
    y1987 integer,
    y1988 integer,
    y1989 integer,
    y1990 integer,
    y1991 integer,
    y1992 integer,
    y1993 integer,
    y1994 integer,
    y1995 integer,
    y1996 integer,
    y1997 integer,
    y1998 integer,
    y1999 bigint,
    y2000 bigint,
    y2001 bigint,
    y2002 bigint,
    y2003 bigint,
    y2004 bigint,
    y2005 bigint,
    y2006 bigint,
    y2007 bigint,
    y2008 bigint,
    y2009 bigint,
    y2010 bigint,
    y2011 bigint,
    y2012 bigint,
    y2013 bigint,
    y2014 bigint,
    y2015 bigint,
    y2016 bigint,
    y2017 bigint,
    y2018 bigint,
    y2019 bigint,
    y2020 bigint,
    y2021 bigint
);


ALTER TABLE public.reciept OWNER TO tnv;

--
-- TOC entry 182 (class 1259 OID 16693)
-- Name: subfunc_code; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE subfunc_code (
    key_subfunc integer NOT NULL,
    name character varying,
    info text
);


ALTER TABLE public.subfunc_code OWNER TO tnv;

--
-- TOC entry 1929 (class 2604 OID 16580)
-- Name: bea_catagory; Type: DEFAULT; Schema: public; Owner: tnv
--

ALTER TABLE ONLY bea_category ALTER COLUMN bea_catagory SET DEFAULT nextval('bea_category_bea_catagory_seq'::regclass);


--
-- TOC entry 1933 (class 2606 OID 16585)
-- Name: bea_category_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY bea_category
    ADD CONSTRAINT bea_category_pkey PRIMARY KEY (bea_catagory);


--
-- TOC entry 1937 (class 2606 OID 16613)
-- Name: budget_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY budget
    ADD CONSTRAINT budget_pkey PRIMARY KEY (budget_key);


--
-- TOC entry 1943 (class 2606 OID 16735)
-- Name: func_code_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY func_code
    ADD CONSTRAINT func_code_pkey PRIMARY KEY (func, subfunc, detail);


--
-- TOC entry 1935 (class 2606 OID 16599)
-- Name: grant_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY "grant"
    ADD CONSTRAINT grant_pkey PRIMARY KEY (grant_key);


--
-- TOC entry 1939 (class 2606 OID 16682)
-- Name: key_agency; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY agency_code
    ADD CONSTRAINT key_agency PRIMARY KEY (agency);


--
-- TOC entry 1931 (class 2606 OID 16684)
-- Name: key_bureau; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY bureau_code
    ADD CONSTRAINT key_bureau PRIMARY KEY (agency, bureau);


--
-- TOC entry 1941 (class 2606 OID 16700)
-- Name: subfunc_code_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY subfunc_code
    ADD CONSTRAINT subfunc_code_pkey PRIMARY KEY (key_subfunc);


--
-- TOC entry 2057 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-02-21 19:15:48 PST

--
-- PostgreSQL database dump complete
--

