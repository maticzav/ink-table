import { tasks, ExecTask, PnpmTask, DeleteTask } from "nadle";

const baseEslintArgs = ["--filter", "!*ts-config", "-r", "exec", "eslint", ".", "--quiet"];

tasks.register("clean", DeleteTask, { paths: ["**/lib/**", "**/build/**"] }).config({
	group: "Development",
	description: "Clean build artifacts"
});

tasks.register("eslint", PnpmTask, { args: baseEslintArgs });
tasks.register("prettier", ExecTask, { command: "prettier", args: ["--check", "."] });
tasks.register("check").config({ dependsOn: ["eslint", "prettier"] });

tasks.register("build", PnpmTask, { args: ["-r", "build"] });

tasks.register("testUnit", PnpmTask, { args: ["run", "-r", "test"] }).config({ dependsOn: ["build"] });
tasks.register("test").config({ dependsOn: ["testUnit"] });

tasks.register("fixEslint", PnpmTask, { args: [...baseEslintArgs, "--fix"] });
tasks.register("fixPrettier", ExecTask, { command: "prettier", args: ["--write", "."] });
tasks.register("format").config({ dependsOn: ["fixEslint", "fixPrettier"] });
