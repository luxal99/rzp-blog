import * as React from "react";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import postService from "../../services/postService";
import "./IndexPage.css";
import localization from "./localization";
import Console from "../../utils/Console";

type IndexPageProps = {};
export const IndexPage = (props: IndexPageProps) => {
	const [locale] = useLocale();
	const postCount = 10;
	const [posts, setPosts] = useState(new Array(postCount).fill(null));
	const [pageCount, setPageCount] = useState(1);
	const [page, setPage] = useState(0);


	useEffect(() => {
		postService.getPageCount({count: postCount, published: true}).then(setPageCount);
	}, []);

	useEffect(() => {
		postService.getAllPreview({count: postCount, page: page, published: true}).then(newPosts => {
			setPosts(newPosts);
		}).catch(err => {
			Console.error(err);
			setPosts([]);
		});
	}, [page]);


	return (
		<div id="index" className="container">
			<div className="row">
				<div className="col s12">
					<h2 className="title">{localization[locale].title}</h2>
					<p className="text">{localization[locale].text}</p>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<PostPreviewList posts={posts}/>
					<Pagination onPageChange={setPage} pageCount={pageCount}/>
				</div>
			</div>
		</div>
	);
};
