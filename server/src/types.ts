import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface Fastifyjwt {
    jwtVerify(request: FastifyRequest, reply?: FastifyReply): Promise<{ parentId: string; iat: number; exp: number }>;
    jwtSign(payload: object): string;
  }

  export interface FastifyRequest {
    parentId?: string;
  }
}

interface FastifyRequest {
  headers: Record<string, string | string[] | undefined>;
  params: Record<string, string>;
  body: Record<string, unknown>;
  parentId?: string;
}

interface FastifyReply {
  status(code: number): {
    send(data: unknown): void;
  };
  send(data: unknown): void;
}