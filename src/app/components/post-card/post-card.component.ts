import {Component, OnInit, Input} from '@angular/core';
import {APIService, Post} from "../../API.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: any;

  constructor(private api: APIService) {
  }

  ngOnInit(): void {
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  async deletePost(post: Post) {
    const toDelete = await this.api.GetPost(post.id)
    this.api.DeletePost(toDelete).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })
  }

}
