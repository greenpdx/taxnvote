--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.11
-- Dumped by pg_dump version 9.3.11
-- Started on 2016-02-23 08:28:24 PST

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
-- TOC entry 196 (class 1259 OID 16844)
-- Name: betc_base; Type: TABLE; Schema: public; Owner: tnv; Tablespace: 
--

CREATE TABLE betc_base (
    betc character varying NOT NULL,
    iscredit integer NOT NULL,
    betc_name character varying
);


ALTER TABLE public.betc_base OWNER TO tnv;

--
-- TOC entry 2036 (class 0 OID 16844)
-- Dependencies: 196
-- Data for Name: betc_base; Type: TABLE DATA; Schema: public; Owner: tnv
--

INSERT INTO betc_base VALUES ('AIPEDCAJ', 1, 'Adjustment To Accrued Int Payable on Exchanges of Deferred US Treasury Sec');
INSERT INTO betc_base VALUES ('AIPEINAJ', 0, 'Adjustment To Accrued Int Payable on Exchanges of Deferred US Treasury Sec');
INSERT INTO betc_base VALUES ('AIPEXDEC', 0, 'Accrued Int Payable on Exchanges of Deferred US Treasury Sec, Decrease');
INSERT INTO betc_base VALUES ('AIPEXINC', 1, 'Accrued Int Payable on Exchanges of Deferred US Treasury Sec, Increase');
INSERT INTO betc_base VALUES ('AP', 1, 'Regular/Supplemental');
INSERT INTO betc_base VALUES ('APADV', 1, 'Appropriation -  Advance');
INSERT INTO betc_base VALUES ('APBGT', 1, 'Appropriation -  Budget');
INSERT INTO betc_base VALUES ('APCRREF', 1, 'Appropriation - Credit Reform');
INSERT INTO betc_base VALUES ('APIND', 1, 'Appropriation - Indefinite');
INSERT INTO betc_base VALUES ('APINDYEC', 1, 'Indefinite, Year End Closing Adjustment, Credit');
INSERT INTO betc_base VALUES ('APINDYED', 0, 'Indefinite, Year End Closing Adjustment, Debit');
INSERT INTO betc_base VALUES ('APLIMIND', 1, 'Appropriation - Limited Indefinite');
INSERT INTO betc_base VALUES ('APOTH', 1, 'Appropriation - Other');
INSERT INTO betc_base VALUES ('APROP', 1, 'Appropriation Warrants');
INSERT INTO betc_base VALUES ('APSPCEXP', 1, 'Special and Trust Fund Unappropriated');
INSERT INTO betc_base VALUES ('APSPCUR', 0, 'Special and Trust Fund Unappropriated');
INSERT INTO betc_base VALUES ('ASDRDCAJ', 1, 'Adjustment to Allocations of Special Drawing Rights, Increase');
INSERT INTO betc_base VALUES ('ASDRDEC', 0, 'Allocations of Special Drawing Rights, Decrease');
INSERT INTO betc_base VALUES ('ASDRINAJ', 0, 'Adjustment to Allocations of Special Drawing Rights, Decrease');
INSERT INTO betc_base VALUES ('ASDRINC', 1, 'Allocations of Special Drawing Rights, Increase');
INSERT INTO betc_base VALUES ('AXFERC', 1, 'Appropriation Transfer, increase');
INSERT INTO betc_base VALUES ('AXFERD', 0, 'Appropriation Transfer, Decrease');
INSERT INTO betc_base VALUES ('BPDC', 1, 'Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('BPDD', 0, 'Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('BPDPC', 1, 'Repayment of Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('BXFERC', 1, 'Balance Transfer , Increase');
INSERT INTO betc_base VALUES ('BXFERD', 0, 'Balance Transfer , Decrease');
INSERT INTO betc_base VALUES ('CIMFDCAJ', 1, 'Adjustment to United States Currency with the International Monetary Fund');
INSERT INTO betc_base VALUES ('CIMFINAJ', 0, 'Adjustment to United States Currency with the International Monetary Fund');
INSERT INTO betc_base VALUES ('CNFSCAJ', 0, 'Adjustment to Change In Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('CNFSDAJ', 1, 'Adjustment to Change In Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('CNONFSC', 1, 'Change In Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('CNONFSD', 0, 'Change In Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('COLAVDEC', 0, 'Collection to an Available Receipt Account, Debit');
INSERT INTO betc_base VALUES ('COLAVINC', 1, 'Credit Adjustment of Collection to an Available Receipt Account');
INSERT INTO betc_base VALUES ('COLAVRAJ', 0, 'Debit Adjustment of Collection for an Available Receipt Account (current fiscal year)');
INSERT INTO betc_base VALUES ('COLAVRCT', 1, 'Collection To An Available Receipt Account, Credit (current fiscal year)');
INSERT INTO betc_base VALUES ('COLINDEC', 0, 'Interest Earnings, Debit');
INSERT INTO betc_base VALUES ('COLININC', 1, 'Credit Adjustment to Interest Earnings');
INSERT INTO betc_base VALUES ('COLINTAJ', 0, 'Debit Adjustment of Interest Earnings');
INSERT INTO betc_base VALUES ('COLL', 1, 'Offsetting Collection');
INSERT INTO betc_base VALUES ('COLLAJ', 0, 'Adjustment to Offsetting Collections');
INSERT INTO betc_base VALUES ('COLLBCA', 1, 'Available Receipts For Budget Clearing Accounts');
INSERT INTO betc_base VALUES ('COLLBCAJ', 0, 'Adjustment to Available Receipts for Budget Clearing Accounts');
INSERT INTO betc_base VALUES ('COLLCA', 1, 'Offset To Payments For Obligations Of Closed Accounts');
INSERT INTO betc_base VALUES ('COLLCAAJ', 0, 'Correction of Offset To Payments For Obligations Of Closed Accounts');
INSERT INTO betc_base VALUES ('COLLINT', 1, 'Interest Earnings, Credit');
INSERT INTO betc_base VALUES ('COLLSBAJ', 0, 'Correction of Offset to Subsidy Payment From Program To Financing Account, Credit Reform');
INSERT INTO betc_base VALUES ('COLLSBSD', 1, 'Offset to Subsidy Payment From Program To Financing Account, Credit Reform');
INSERT INTO betc_base VALUES ('COLURDEC', 0, 'Collection to an Unavailable Receipt Account, Debit');
INSERT INTO betc_base VALUES ('COLURINC', 1, 'Credit Adjustment of Collection to an Unavailable Receipt Account');
INSERT INTO betc_base VALUES ('COLUVRAJ', 0, 'Debit Adjustment of Collection to an Unavailable Receipt Account');
INSERT INTO betc_base VALUES ('COLUVRCT', 1, 'Collection To An Unavailable Receipt Account, Credit');
INSERT INTO betc_base VALUES ('CRBC', 1, 'Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('CRBD', 0, 'Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('CRIMFDEC', 0, 'United States Currency with the International Monetary Fund, Decrease');
INSERT INTO betc_base VALUES ('CRIMFINC', 1, 'United States Currency with the International Monetary Fund, Increase');
INSERT INTO betc_base VALUES ('CXFERC', 1, 'Transfers to General Fund Receipt Accounts');
INSERT INTO betc_base VALUES ('CXFERD', 0, 'Transfers to General Fund Receipt Accounts');
INSERT INTO betc_base VALUES ('DDIMFDEC', 0, 'Dollar Deposits with the International Monetary Fund, Decrease');
INSERT INTO betc_base VALUES ('DDIMFINC', 1, 'Dollar Deposits with the International Monetary Fund, Increase');
INSERT INTO betc_base VALUES ('DFIDSDEC', 0, 'Deferred Interest (Discount) on US Treasury Securities, Decrease');
INSERT INTO betc_base VALUES ('DFIDSINC', 1, 'Deferred Interest (Discount) on US Treasury Securities, Increase');
INSERT INTO betc_base VALUES ('DFINTDEC', 0, 'Deferred Interest (Discount) on US Treasury Securities, Decrease');
INSERT INTO betc_base VALUES ('DFINTINC', 1, 'Deferred Interest (Discount) on US Treasury Securities, Increase');
INSERT INTO betc_base VALUES ('DFIPDCAJ', 1, 'Adjustment To Deferred Interest (Premium) on US Treasury Securities');
INSERT INTO betc_base VALUES ('DFIPINAJ', 0, 'Adjustment To Deferred Interest (Premium) on US Treasury Securities');
INSERT INTO betc_base VALUES ('DFIPRDEC', 0, 'Deferred Interest (Premium) on US Treasury Securities, Decrease');
INSERT INTO betc_base VALUES ('DFIPRINC', 1, 'Deferred Interest (Premium) on US Treasury Securities, Increase');
INSERT INTO betc_base VALUES ('DFNXDCAJ', 1, 'Adjustment To Deposit Funds Unexpended');
INSERT INTO betc_base VALUES ('DFNXINAJ', 0, 'Adjustment To Deposit Funds Unexpended');
INSERT INTO betc_base VALUES ('DFUNXDEC', 0, 'Deposit Funds Unexpended, Decrease');
INSERT INTO betc_base VALUES ('DFUNXINC', 1, 'Deposit Funds Unexpended, Increase');
INSERT INTO betc_base VALUES ('DHPDCAJ', 1, 'Adjustment To Debt Held by the Public');
INSERT INTO betc_base VALUES ('DHPINAJ', 0, 'Adjustment To Debt Held by the Public');
INSERT INTO betc_base VALUES ('DHPUBDEC', 0, 'Debt Held by the Public, Decrease');
INSERT INTO betc_base VALUES ('DHPUBINC', 1, 'Debt Held by the Public, Increase');
INSERT INTO betc_base VALUES ('DIDSDCAJ', 1, 'Adjustment To Deferred Interest (Discount) on US Treasury Securities');
INSERT INTO betc_base VALUES ('DIDSINAJ', 0, 'Adjustment To Deferred Interest (Discount) on US Treasury Securities');
INSERT INTO betc_base VALUES ('DIMFDCAJ', 1, 'Adjustment To Dollar Deposits with the International Monetary Fund');
INSERT INTO betc_base VALUES ('DIMFINAJ', 0, 'Adjustment To Dollar Deposits with the International Monetary Fund');
INSERT INTO betc_base VALUES ('DINTDCAJ', 1, 'Adjustment To Deferred Interest (Discount) on US Treasury Securities');
INSERT INTO betc_base VALUES ('DINTINAJ', 0, 'Adjustment To Deferred Interest (Discount) on US Treasury Securities');
INSERT INTO betc_base VALUES ('DISB', 0, 'Gross Disbursement');
INSERT INTO betc_base VALUES ('DISBAJ', 1, 'Adjustment to Gross Disbursements');
INSERT INTO betc_base VALUES ('DISBBCA', 0, 'Gross Disbursement For Budget Clearing Accounts');
INSERT INTO betc_base VALUES ('DISBBCAJ', 1, 'Adjustment to Gross Disbursements for Budget Clearing Accounts');
INSERT INTO betc_base VALUES ('DISBCA', 0, 'Payments For Obligations Of Closed Accounts');
INSERT INTO betc_base VALUES ('DISBCAAJ', 1, 'Adjustment to Payments For Obligations Of Closed Accounts');
INSERT INTO betc_base VALUES ('DISBSBAJ', 1, 'Adjustment to Subsidy Payment From Program To Financing Account, Credit Reform');
INSERT INTO betc_base VALUES ('DISBSBSD', 0, 'Subsidy Payment From Program To Financing Account, Credit Reform');
INSERT INTO betc_base VALUES ('DPMOI', 1, 'Domestic Postal Money Orders Issued');
INSERT INTO betc_base VALUES ('DPMOIAJ', 0, 'Adjustment to Domestic Postal Money Orders Issued');
INSERT INTO betc_base VALUES ('DPMOP', 0, 'Domestic Postal Money Orders Paid');
INSERT INTO betc_base VALUES ('DPMOPAJ', 1, 'Adjustment to Domestic Postal Money Orders Paid');
INSERT INTO betc_base VALUES ('DQTDEC', 0, 'Direct Quota Decrease');
INSERT INTO betc_base VALUES ('DQTDECAJ', 1, 'Adjustment To Direct Quota');
INSERT INTO betc_base VALUES ('DQTINC', 1, 'Direct Quota Increase');
INSERT INTO betc_base VALUES ('DQTINCAJ', 0, 'Adjustment To Direct Quota');
INSERT INTO betc_base VALUES ('FFBC', 1, 'Borrowing From The Federal Financing Bank');
INSERT INTO betc_base VALUES ('FFBD', 0, 'Borrowing From The Federal Financing Bank');
INSERT INTO betc_base VALUES ('FFBPC', 1, 'Repayment Of Borrowing From The Federal Financing Bank');
INSERT INTO betc_base VALUES ('FFBPD', 0, 'Repayment Of Borrowing From The Federal Financing Bank');
INSERT INTO betc_base VALUES ('FHOTXC', 1, 'Funds Held Outside The Treasury, Credit');
INSERT INTO betc_base VALUES ('FHOTXCAJ', 0, 'Adjustment to Funds Held Outside The Treasury, Credit');
INSERT INTO betc_base VALUES ('FHOTXD', 0, 'Funds Held Outside The Treasury, Debit');
INSERT INTO betc_base VALUES ('FHOTXDAJ', 1, 'Adjustment to Funds Held Outside The Treasury, Debit');
INSERT INTO betc_base VALUES ('FPMOI', 1, 'Foreign Postal Money Orders Issued');
INSERT INTO betc_base VALUES ('FPMOIAJ', 0, 'Adjustment to Foreign Postal Money Orders Issued');
INSERT INTO betc_base VALUES ('FPMOP', 0, 'Foreign Postal Money Orders Paid');
INSERT INTO betc_base VALUES ('FPMOPAJ', 1, 'Adjustment to Foreign Postal Money Orders Paid');
INSERT INTO betc_base VALUES ('FTAC', 1, 'FICA Tax Adjustment, Increase');
INSERT INTO betc_base VALUES ('FTAD', 0, 'FICA Tax Adjustment, Decrease');
INSERT INTO betc_base VALUES ('HSDRDCAJ', 1, 'Adjustment To Holdings of Special Drawing Rights');
INSERT INTO betc_base VALUES ('HSDRDEC', 0, 'Holdings of Special Drawing Rights, Decrease');
INSERT INTO betc_base VALUES ('HSDRINAJ', 0, 'Adjustment To Holdings of Special Drawing Rights');
INSERT INTO betc_base VALUES ('HSDRINC', 1, 'Holdings of Special Drawing Rights, Increase');
INSERT INTO betc_base VALUES ('IGHDDCAJ', 1, 'Adjustment To Intragovernmental Holdings');
INSERT INTO betc_base VALUES ('IGHDINAJ', 0, 'Adjustment To Intragovernmental Holdings');
INSERT INTO betc_base VALUES ('IGHLDDEC', 0, 'Intragovernmental Holdings, Decrease');
INSERT INTO betc_base VALUES ('IGHLDINC', 1, 'Intragovernmental Holdings, Increase');
INSERT INTO betc_base VALUES ('INVCERT', 0, 'Investment (Purchase) In Participaction Certificates');
INSERT INTO betc_base VALUES ('INVCRTAJ', 1, 'Adjustment to Investment (Purchase) In Participaction Certificates');
INSERT INTO betc_base VALUES ('INVINFAJ', 0, 'Debit Adjustment of Investment In US Treasury Securities');
INSERT INTO betc_base VALUES ('INVNFDAJ', 1, 'Adjustment to Investment In Non-Federal Securities');
INSERT INTO betc_base VALUES ('INVNFED', 0, 'Investment In Non-Federal Securities');
INSERT INTO betc_base VALUES ('INVNFS', 0, 'Investment In Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('INVNFSAJ', 1, 'Adjustment to Investment In Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('INVNGSAJ', 1, 'Adjustment to Investment In Non-Guaranteed Government Agency Securities');
INSERT INTO betc_base VALUES ('INVNGSEC', 0, 'Investment In Non-Guaranteed Government Agency Securities');
INSERT INTO betc_base VALUES ('INVTSAJ', 1, 'Credit Adjustment of Investment In US Treasury Securities');
INSERT INTO betc_base VALUES ('INVTSEC', 0, 'Investment In US Treasury Securities, Debit');
INSERT INTO betc_base VALUES ('INVTSINF', 1, 'Investment In US Treasury Securities, Credit');
INSERT INTO betc_base VALUES ('IOGDEC', 0, 'Decrease in Quota, Increment on Gold Resulting from the 1972 Par Modif Act');
INSERT INTO betc_base VALUES ('IOGDECAJ', 1, 'Adjustment To Decrease in Quota, Increment on Gold Resulting from the 1972 Par Modif Act');
INSERT INTO betc_base VALUES ('IOGINC', 1, 'Increase in Quota, Increment on Gold Resulting from the 1972 Par Modif Act');
INSERT INTO betc_base VALUES ('IOGINCAJ', 0, 'Adjustment To Increase in Quota, Increment on Gold Resulting from the 1972 Par Modif Act');
INSERT INTO betc_base VALUES ('JRCR', 1, 'Appropriation - Joint Resolution/Continuing Resolution');
INSERT INTO betc_base VALUES ('LOCDEC', 0, 'Decrease in Letter of Credit');
INSERT INTO betc_base VALUES ('LOCDECAJ', 1, 'Adjustment To Decrease in Letter of Credit');
INSERT INTO betc_base VALUES ('LOCINC', 1, 'Increase in Letter of Credit');
INSERT INTO betc_base VALUES ('LOCINCAJ', 0, 'Adjustmenty To Increase in Letter of Credit');
INSERT INTO betc_base VALUES ('LPC', 0, 'Limited Payability Cancellation');
INSERT INTO betc_base VALUES ('LPCAJ', 1, 'Adjustment to Limited Payability Cancellation');
INSERT INTO betc_base VALUES ('MLIABDEC', 0, 'Miscellaneous Liabilities, Decrease');
INSERT INTO betc_base VALUES ('MLIABINC', 1, 'Miscellaneous Liabilities, Increase');
INSERT INTO betc_base VALUES ('MLIBDCAJ', 1, 'Adjustment To Miscellaneous Liabilities');
INSERT INTO betc_base VALUES ('MLIBINAJ', 0, 'Adjustment To Miscellaneous Liabilities');
INSERT INTO betc_base VALUES ('MVADJDEC', 0, 'Maintenance of Value Adjustment, Decrease');
INSERT INTO betc_base VALUES ('MVADJINC', 1, 'Maintenance of Value Adjustment, Increase');
INSERT INTO betc_base VALUES ('MVAJDCAJ', 1, 'Adjustment To Maintenance of Value Adjustment');
INSERT INTO betc_base VALUES ('MVAJINAJ', 0, 'Adjustment To Maintenance of Value Adjustment');
INSERT INTO betc_base VALUES ('NCRBC', 1, 'Non-Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('NCRBD', 0, 'Non-Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('NCRIBC', 1, 'Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('NCRIBD', 0, 'Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('NETC', 1, 'Nonexpenditure Transfer, Credit');
INSERT INTO betc_base VALUES ('NETCAJ', 0, 'Adjustment to Nonexpenditure Transfer, Credit');
INSERT INTO betc_base VALUES ('NETD', 0, 'Nonexpenditure Transfer, Debit');
INSERT INTO betc_base VALUES ('NETDAJ', 1, 'Adjustment to Nonexpenditure Transfers, Debit');
INSERT INTO betc_base VALUES ('OCNFSCAJ', 0, 'Adjustment to Offset Of Change In Non-Federal Securities (Market Value), Credit');
INSERT INTO betc_base VALUES ('OCNFSDAJ', 1, 'Adjustment to Offset Of Change In Non-Federal Securities (Market Value), Debit');
INSERT INTO betc_base VALUES ('OCNONFSC', 1, 'Offset Of Change In Non-Federal Securities (Market Value), Credit');
INSERT INTO betc_base VALUES ('OCNONFSD', 0, 'Offset Of Change In Non-Federal Securities (Market Value), Debit');
INSERT INTO betc_base VALUES ('PCRBC', 1, 'Repayment Of Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('PCRBD', 0, 'Repayment Of Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('PNCRBC', 1, 'Repayment Of Non-Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('PNCRBD', 0, 'Repayment Of Non-Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('PNCRIBC', 1, 'Repayment of Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('PNCRIBD', 0, 'Repayment of Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('POC', 1, 'Payment Over Cancellation');
INSERT INTO betc_base VALUES ('POCAJ', 0, 'Adjustment to a Payment Over Cancellation');
INSERT INTO betc_base VALUES ('PURCERT', 0, 'Purchase Of Participation Certificates Sales Fund');
INSERT INTO betc_base VALUES ('PURCRTAJ', 1, 'Adjustment to Purchase Of Participation Certificates Sales Fund');
INSERT INTO betc_base VALUES ('PURFHLAJ', 1, 'Adjustment to Purchase Of Federal Home Loan Bank & Federal Land Bank Securities');
INSERT INTO betc_base VALUES ('PURFHLB', 0, 'Purchase Of Federal Home Loan Bank And Federal Land Bank Securities');
INSERT INTO betc_base VALUES ('RAPPRC', 1, 'Reappropriation');
INSERT INTO betc_base VALUES ('RAPPRD', 0, 'Reappropriation');
INSERT INTO betc_base VALUES ('REC', 0, 'Reclamation Credit');
INSERT INTO betc_base VALUES ('RECAJ', 1, 'Adjustment to a Reclamation Credit');
INSERT INTO betc_base VALUES ('REDCERT', 1, 'Redemption (Sale) Of Participation Certificates');
INSERT INTO betc_base VALUES ('REDCRTAJ', 0, 'Adjustment to Redemption (Sale) Of Participaction Certificates');
INSERT INTO betc_base VALUES ('REDFHLAJ', 0, 'Adjustment to Sale Of Federal Home Loan Bank And Federal Land Bank Securities');
INSERT INTO betc_base VALUES ('REDFHLB', 1, 'Sale Of Federal Home Loan Bank And Federal Land Bank Securities');
INSERT INTO betc_base VALUES ('REDNFDAJ', 0, 'Adjustment to Redemption Of Non-Federal Securities');
INSERT INTO betc_base VALUES ('REDNFED', 1, 'Redemption Of Non-Federal Securities');
INSERT INTO betc_base VALUES ('REDNFS', 1, 'Redemption of Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('REDNFSAJ', 0, 'Adjustment to Redemption of Non-Federal Securities (Market Value)');
INSERT INTO betc_base VALUES ('REDNGMAJ', 1, 'Adjustment to Redemption Of Non-Guaranteed Government Agency Sec In Market');
INSERT INTO betc_base VALUES ('REDNGMKT', 0, 'Redemption Of Non-Guaranteed Government Agency Securities In Market');
INSERT INTO betc_base VALUES ('REDNGSAJ', 0, 'Adjustment to Redemption (Sale) Of Non-Guaranteed Government Agency Securities');
INSERT INTO betc_base VALUES ('REDNGSEC', 1, 'Redemption (Sale) Of Non-Guaranteed Government Agency Securities');
INSERT INTO betc_base VALUES ('REDTSAJ', 0, 'Debit Adjustment of Redemption (Sale) Of US Treasury Securities');
INSERT INTO betc_base VALUES ('REDTSD', 0, 'Redemption (Sale) Of US Treasury Securities, Debit');
INSERT INTO betc_base VALUES ('REDTSDAJ', 1, 'Credit Adjustment of Redemption (Sale) Of US Treasury Securities');
INSERT INTO betc_base VALUES ('REDTSEC', 1, 'Redemption (Sale) Of US Treasury Securities, Credit');
INSERT INTO betc_base VALUES ('REFTAXC', 1, 'Refund of Taxes, Credit');
INSERT INTO betc_base VALUES ('REFTAXD', 0, 'Refund of Taxes, Debit');
INSERT INTO betc_base VALUES ('REFTXCAJ', 0, 'Adjustment To Refund of Taxes');
INSERT INTO betc_base VALUES ('REFTXDAJ', 1, 'Adjustment To Refund of Taxes');
INSERT INTO betc_base VALUES ('RNCRIBC', 1, 'Reverse Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('RNCRIBD', 0, 'Reverse Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('ROIDCAJ', 1, 'Adjustment to Revaluation of Investments in Exchange Stabilization Funds');
INSERT INTO betc_base VALUES ('ROIDEC', 0, 'Revaluation of Investments in Exchange Stabilization Funds, Decrease');
INSERT INTO betc_base VALUES ('ROIINAJ', 0, 'Adjustment to Revaluation of Investments in Exchange Stabilization Funds');
INSERT INTO betc_base VALUES ('ROIINC', 1, 'Revaluation of Investments in Exchange Stabilization Funds, Increase');
INSERT INTO betc_base VALUES ('RPCVADEC', 0, 'Receivable/Payable for the US Currency Valuation Adj, Decrease');
INSERT INTO betc_base VALUES ('RPCVAINC', 1, 'Receivable/Payable for the US Currency Valuation Adj, Increase');
INSERT INTO betc_base VALUES ('RPCVDCAJ', 1, 'Adjustment To Receivable/Payable for the US Currency Valuation Adj');
INSERT INTO betc_base VALUES ('RPCVINAJ', 0, 'Adjustment To Receivable/Payable for the US Currency Valuation Adj');
INSERT INTO betc_base VALUES ('RPNCRIC', 1, 'Reverse Repayment Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('RPNCRID', 0, 'Reverse Repayment Non-Credit Reform Borrowing Capitalized Interest from the US Treasury');
INSERT INTO betc_base VALUES ('RS', 1, 'Appropriation -  Rescission(s)');
INSERT INTO betc_base VALUES ('RTSCDCAJ', 1, 'Adjustment To Receivable on US Treasury Securities');
INSERT INTO betc_base VALUES ('RTSCINAJ', 0, 'Adjustment To Receivable on US Treasury Securities');
INSERT INTO betc_base VALUES ('RTSECDEC', 0, 'Receivable on US Treasury Securities, Decrease');
INSERT INTO betc_base VALUES ('RTSECINC', 1, 'Receivable on US Treasury Securities, Increase');
INSERT INTO betc_base VALUES ('RWNCRIC', 1, 'Reverse Write-Off Of Non-Credit Reform Borrowing  Capitalized Interest From The US Treasury');
INSERT INTO betc_base VALUES ('RWNCRID', 0, 'Reverse Write-Off Of Non-Credit Reform Borrowing  Capitalized Interest From The US Treasury');
INSERT INTO betc_base VALUES ('SALECERT', 1, 'Sale Of Participation Certificates Sales Fund');
INSERT INTO betc_base VALUES ('SALECTAJ', 0, 'Adjustment to Sale Of Participation Certificates Sales Fund');
INSERT INTO betc_base VALUES ('SALNGMAJ', 0, 'Adjustment to Sale Of Non-Guaranteed Government Agency Securities In Market');
INSERT INTO betc_base VALUES ('SALNGMKT', 1, 'Sale Of Non-Guaranteed Government Agency Securities In Market');
INSERT INTO betc_base VALUES ('SBDFDCAJ', 1, 'Adjustment To Net Proceeds from Sales and Withholdings for Savings Bonds, Deposit Fund Liability');
INSERT INTO betc_base VALUES ('SBDFDEC', 0, 'Net Proceeds from Sales and Withholdings for Savings Bonds, Deposit Fund Liability Increase');
INSERT INTO betc_base VALUES ('SBDFINAJ', 0, 'Adjustment To Net Proceeds from Sales and Withholdings for Savings Bonds, Deposit Fund Liability');
INSERT INTO betc_base VALUES ('SBDFINC', 1, 'Net Proceeds from Sales and Withholdings for Savings Bonds, Deposit Fund Liability Decrease');
INSERT INTO betc_base VALUES ('SDRCDCAJ', 1, 'Adjustment To Special Drawing Rights Certificates');
INSERT INTO betc_base VALUES ('SDRCDEC', 0, 'Special Drawing Rights Certificates, Decrease');
INSERT INTO betc_base VALUES ('SDRCINAJ', 0, 'Adjustment To Special Drawing Rights Certificates');
INSERT INTO betc_base VALUES ('SDRCINC', 1, 'Special Drawing Rights Certificates, Increase');
INSERT INTO betc_base VALUES ('SRRCTEXP', 0, 'Surplus, Special or Trust Available for Restoration');
INSERT INTO betc_base VALUES ('SRRCTUR', 1, 'Surplus, Special or Trust Available for Restoration');
INSERT INTO betc_base VALUES ('SRRTYECR', 1, 'Surplus, YR End Closing Cancellation Special and Non-Revolving Trust fund (Unavail Receipts), Credit');
INSERT INTO betc_base VALUES ('SRRTYEDR', 0, 'Surplus, YR End Closing Cancellation Special and Non-Revolving Trust fund (Unavail Receipts), Debit');
INSERT INTO betc_base VALUES ('SW', 0, 'Surplus, Unavailable for Restoration');
INSERT INTO betc_base VALUES ('SWUGFRCR', 1, 'Sweeping of miscellaneous general fund unavailable receipt accounts, credit');
INSERT INTO betc_base VALUES ('SWUGFRDR', 0, 'Sweeping of miscellaneous general fund unavailable receipt accounts, debit');
INSERT INTO betc_base VALUES ('SWYE', 0, 'Surplus, Year End Closing Cancellation of Expired Account Balances');
INSERT INTO betc_base VALUES ('SWYEAR', 0, 'Surplus, YR End Closing Cancellation Revolving, Special and Non-Revolving Trust fund (Avail Rec)');
INSERT INTO betc_base VALUES ('UCC', 0, 'Unavailable Check Cancellation');
INSERT INTO betc_base VALUES ('UCCAJ', 1, 'Adjustment to an Unavailable Check Cancellation');
INSERT INTO betc_base VALUES ('UNAMDIAJ', 0, 'Amortization of Investments in U.S. Securities, Debit');
INSERT INTO betc_base VALUES ('UNAMDISC', 1, 'Amortization of Investments in U.S. Securities, Credit');
INSERT INTO betc_base VALUES ('UNAMPC', 1, 'Unamortized Discount, Premium and Unpaid Interest, Credit');
INSERT INTO betc_base VALUES ('UNAMPCAJ', 0, 'Debit Adjustment of Unamortized Discount/Premium');
INSERT INTO betc_base VALUES ('UNAMPRAJ', 1, 'Credit Adjustment of Unamortized Discount/Premium');
INSERT INTO betc_base VALUES ('UNAMPREM', 0, 'Unamortized Discount, Premium and Unpaid Interest, Debit');
INSERT INTO betc_base VALUES ('UNRLDIAJ', 0, 'Unrealized Discount, Debit');
INSERT INTO betc_base VALUES ('UNRLDISC', 1, 'Unrealized Discount, Credit');
INSERT INTO betc_base VALUES ('USQDEC', 0, 'US Quota, IMF Decrease');
INSERT INTO betc_base VALUES ('USQDECAJ', 1, 'Adjustment To US Quota, IMF');
INSERT INTO betc_base VALUES ('USQINC', 1, 'US Quota, IMF Increase');
INSERT INTO betc_base VALUES ('USQINCAJ', 0, 'Adjustment To US Quota, IMF');
INSERT INTO betc_base VALUES ('WJVFFAR', 0, 'Warrant Journal Voucher - Transfer From Trust Fund');
INSERT INTO betc_base VALUES ('WJVFTUR', 1, 'Warrant Journal Voucher - Transfer From Trust Fund');
INSERT INTO betc_base VALUES ('WJVTFUR', 0, 'Warrant Journal Voucher - Transfer To Trust Fund');
INSERT INTO betc_base VALUES ('WJVTTAR', 1, 'Warrant Journal Voucher - Transfer To Trust Fund');
INSERT INTO betc_base VALUES ('WNCRC', 1, 'Write-Off Of Non-Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('WNCRD', 0, 'Write-Off Of Non-Credit Reform Borrowing From The US Treasury');
INSERT INTO betc_base VALUES ('WNCRIC', 1, 'Write-Off Of Non-Credit Reform Borrowing  Capitalized Interest From The US Treasury');
INSERT INTO betc_base VALUES ('WNCRID', 0, 'Write-Off Of Non-Credit Reform Borrowing Capitalized Interest From The US Treasury');


--
-- TOC entry 1928 (class 2606 OID 16852)
-- Name: betc_base_pkey; Type: CONSTRAINT; Schema: public; Owner: tnv; Tablespace: 
--

ALTER TABLE ONLY betc_base
    ADD CONSTRAINT betc_base_pkey PRIMARY KEY (betc, iscredit);


-- Completed on 2016-02-23 08:28:26 PST

--
-- PostgreSQL database dump complete
--

