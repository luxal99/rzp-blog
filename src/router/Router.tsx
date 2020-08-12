import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthGuard } from "../components/authorization/AuthGuard";
import { RoleGuard } from "../components/authorization/RoleGuard";
import { LoginPage } from "../pages/admin/login/LoginPage";
import { LogoutPage } from "../pages/admin/login/LogoutPage";
import { AdminPostsListPage } from "../pages/admin/posts/adminPostsListPage/AdminPostsListPage";
import { Error404 } from "../pages/errors/Error404";
import { IndexPage } from "../pages/index/IndexPage";
import { PostPage } from "../pages/post/PostPage";
import { UserProfilePage } from "../pages/user/userProfile/UserProfilePage";

export const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={IndexPage}/>
			<Route exact path="/login" component={LoginPage}/>
			<Route exact path="/404" component={Error404}/>
			<Route path="/posts/:slug" component={PostPage}/>
			<AuthGuard>
				<Route exact path="/logout" component={LogoutPage}/>
				<RoleGuard roles={["user"]}>
					<Route exact path={"/user/profile"} component={UserProfilePage}/>
				</RoleGuard>
				<RoleGuard roles={["admin"]}>
					<Route exact path="/admin/posts" component={AdminPostsListPage}/>
				</RoleGuard>
			</AuthGuard>
		</Switch>
	);
};
