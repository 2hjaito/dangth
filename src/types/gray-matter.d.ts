declare module "gray-matter" {
  interface GrayMatterFile<T> {
    data: Record<string, any>;
    content: T;
    excerpt?: string;
  }

  interface Option {
    excerpt?: boolean;
    excerpt_separator?: string;
  }

  function matter<T = string>(input: string, options?: Option): GrayMatterFile<T>;

  export = matter;
}
