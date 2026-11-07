import { test, expect, APIRequestContext } from '@playwright/test';

const booking = {
  firstname: 'Rudra',
  lastname: 'Surti',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Breakfast',
};

async function token(request: APIRequestContext): Promise<string> {
  const res = await request.post('/auth', { data: { username: 'admin', password: 'password123' } });
  expect(res.ok()).toBeTruthy();
  return (await res.json()).token;
}

test.describe('Booking API', () => {
  test('health check returns 201 @smoke', async ({ request }) => {
    const res = await request.get('/ping');
    expect(res.status()).toBe(201);
  });

  test('create and read a booking', async ({ request }) => {
    const created = await request.post('/booking', { data: booking });
    expect(created.ok()).toBeTruthy();
    const { bookingid, booking: body } = await created.json();
    expect(body).toMatchObject(booking);

    const read = await request.get(`/booking/${bookingid}`);
    expect(await read.json()).toMatchObject(booking);
  });

  test('update a booking with a token', async ({ request }) => {
    const { bookingid } = await (await request.post('/booking', { data: booking })).json();
    const res = await request.put(`/booking/${bookingid}`, {
      data: { ...booking, totalprice: 200 },
      headers: { Cookie: `token=${await token(request)}` },
    });
    expect(res.ok()).toBeTruthy();
    expect((await res.json()).totalprice).toBe(200);
  });

  test('delete without a token is rejected', async ({ request }) => {
    const { bookingid } = await (await request.post('/booking', { data: booking })).json();
    const res = await request.delete(`/booking/${bookingid}`);
    expect(res.status()).toBe(403);
  });

  test('unknown booking returns 404', async ({ request }) => {
    const res = await request.get('/booking/999999999');
    expect(res.status()).toBe(404);
  });
});
