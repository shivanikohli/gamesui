import { Injectable } from "@angular/core";
import { environment as env } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAllGames() {
    return this.http.get(env.apiUrl + "gamesarena");
  }

}


