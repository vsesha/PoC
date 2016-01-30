#!/usr/bin/python
import json
import sys
import getopt
import random

class Usage(Exception):
    def __init__(self, msg):
        self.msg = msg
		
def calcMargins(inputJSONobject):
	a=10;
	b=20;
	IM1= random.randint(10000, 99999);
	IM2= random.randint(10000, 99999);
	IM3= random.randint(10000, 99999);
	IM4= random.randint(10000, 99999);
	IM5= random.randint(10000, 99999);
	IM6= random.randint(10000, 99999);
	IM7= random.randint(10000, 99999);
	IM8= random.randint(10000, 99999);	
	
	MM1= random.randint(100000, 999999);
	MM2= random.randint(100000, 999999);
	MM3= random.randint(100000, 999999);
	MM4= random.randint(100000, 999999);
				
		
 	summary = [{"Account": "ABC-EFG", "Currency": "USD", "IM": IM1},
				{"Account": "XYZ-111", "Currency": "JPY", "IM": IM2},
				{"Account": "PQR-222", "Currency": "EUR", "IM": IM3},
				{"Account": "RST-123", "Currency": "USD", "IM": IM4},
				{"Account": "FFF-123", "Currency": "USD", "IM": IM5},
				{"Account": "JJJ-123", "Currency": "JPY", "IM": IM6},
				{"Account": "RST-123", "Currency": "EUR", "IM": IM7},
				{"Account": "PQR-123", "Currency": "INR", "IM": IM8}]
	
	details	=[{"Account": "ABC-EFG", "Exchange":"CME","Currency": "USD", "ScanningRisk_USD":"0.0043","MaintainSPANRequirements":"7736","InitialMargins": IM1,"MaintainMargins": MM1,"InitialSPANRequirements":"441321" },
			  {"Account": "XYZ-111", "Exchange":"CME","Currency": "JPY", "ScanningRisk_USD":"0.303","MaintainSPANRequirements":"71736","InitialMargins": IM2,"MaintainMargins": MM2,"InitialSPANRequirements":"96432" },
			  {"Account": "PQR-222", "Exchange":"CME","Currency": "EUR", "ScanningRisk_USD":"0.12","MaintainSPANRequirements":"17136","InitialMargins": IM3,"MaintainMargins": MM3,"InitialSPANRequirements":"8842" },
			  {"Account": "RST-123", "Exchange":"CME","Currency": "USD", "ScanningRisk_USD":"1.2","MaintainSPANRequirements":"7736","InitialMargins": IM4 ,"MaintainMargins": MM4,"InitialSPANRequirements":"26535"},
			  
			  {"Account": "FFF-123", "Exchange":"CME","Currency": "USD", "ScanningRisk_USD":"0.0043","MaintainSPANRequirements":"7736","InitialMargins": IM5,"MaintainMargins": MM1,"InitialSPANRequirements":"441321" },
			  {"Account": "JJJ-123", "Exchange":"CME","Currency": "JPY", "ScanningRisk_USD":"0.303","MaintainSPANRequirements":"71736","InitialMargins": IM6,"MaintainMargins": MM2,"InitialSPANRequirements":"96432" },
			  {"Account": "RST-123", "Exchange":"CME","Currency": "EUR", "ScanningRisk_USD":"0.12","MaintainSPANRequirements":"17136","InitialMargins": IM7,"MaintainMargins": MM3,"InitialSPANRequirements":"8842" },
			  {"Account": "PQR-123", "Exchange":"CME","Currency": "INR", "ScanningRisk_USD":"1.2","MaintainSPANRequirements":"7736","InitialMargins": IM8 ,"MaintainMargins": MM4,"InitialSPANRequirements":"26535"}
					]
	
	outputJSONobject={"summary":summary,"details":details};
	return outputJSONobject;
	
def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], "h", ["help"])
	param = sys.argv[1]

	output = calcMargins(param);
	print json.dumps (output)
	sys.stdout.flush()
		
    except getopt.error, msg:
        print msg
        #print "for help use --help"
        sys.exit(2)
    
    for o, a in opts:
        if o in ("-h", "--help"): 
            print [{"Send a JSON string as a parameter"}]
            sys.exit(0)
	
	

if __name__ == "__main__":
    main()

