import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { RESEND_API_TOKEN } from 'astro:env/server';
import { Resend } from 'resend';

export const server = {
  send: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      postCode: z.string().optional(),
      address: z.string().optional(),
      tel: z
        .string()
        .regex(/^[\d-]+$/)
        .optional(),

      select: z.string().optional(),
      message: z.string(),
      privacy: z.string().transform((val) => val === 'on'),
    }),
    handler: async (input) => {
      const resend = new Resend(RESEND_API_TOKEN);
      const html = `<table>
        <tr>
          <td>名前</td>
          <td>${input.name}</td>
        </tr>
        <tr>
          <td>メールアドレス</td>
          <td>${input.email}</td>
        </tr>
        <tr>
          <td>住所</td>
          <td>${input.address}</td>
        </tr>
        <tr>
          <td>電話番号</td>
          <td>${input.tel}</td>
        </tr>
        <tr>
          <td>選択</td>
          <td>${input.select}</td>
        </tr>
        <tr>
          <td>お問い合わせ内容</td>
          <td>${input.message}</td>
        </tr>
        <tr>
          <td>プライバシーに同意して送信してください。</td>
          <td>${input.privacy ? '同意' : '不同意'}</td>
        </tr>
       </table>`;

      const { data, error } = await resend.batch.send([
        {
          from: 'Acme <onboarding@resend.dev>',
          to: ['delivered@resend.dev'],
          subject: `${input.name} 様からお問い合わせがありました。`,
          html,
        },
        {
          from: 'Acme <onboarding@resend.dev>',
          // to: [input.email] ※ 本番はこちらを使用,
          to: ['delivered@resend.dev'],
          subject: 'お問い合わせありがとうございました。',
          html: `
            <p>${input.name} 様</p>
            <p>お問い合わせいただきありがとうございます。</p>
            <p>以下の内容で承りました。担当者より折り返しご連絡いたします。</p>
            ${html}
          `,
        },
      ]);
      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }
      return data;
    },
  }),
};
