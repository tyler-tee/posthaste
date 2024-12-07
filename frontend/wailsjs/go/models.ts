export namespace backend {
	
	export class Post {
	    id: string;
	    publish_date: string;
	    category: string;
	    content: string;
	    published: boolean;
	    slug: string;
	    tags: string;
	    title: string;
	
	    static createFrom(source: any = {}) {
	        return new Post(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.publish_date = source["publish_date"];
	        this.category = source["category"];
	        this.content = source["content"];
	        this.published = source["published"];
	        this.slug = source["slug"];
	        this.tags = source["tags"];
	        this.title = source["title"];
	    }
	}

}

