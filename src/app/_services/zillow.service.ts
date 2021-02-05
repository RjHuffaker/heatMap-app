import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { HttpClient, HttpClientModule, HttpParams } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class ZillowService {

  constructor(
    private http: HttpClient
  ) { }

  getZillowData(place){

    var zwsid = "X1-ZWz1ghiciuoeff_6jziz";

    var address = place.name.split(" ").join("+");

    var citystatezip = place.formatted_address.split(", ")[2].split(" ").join("+");

    var baseUrl = "https://azpestcontrol.services/api/_zillowData.php";
    
    var compiledUrl = baseUrl+"?address="+address+"&citystatezip="+citystatezip;

    return this.http.get(compiledUrl, {responseType: "text"});

  }

  xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {

        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;

        if (typeof(obj[nodeName]) === "undefined") {
          if(nodeName === "#text"){
            obj = this.xmlToJson(item);
          } else {
            obj[nodeName] = this.xmlToJson(item);
          }
        } else {
          if (typeof(obj[nodeName].push) === "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };

}