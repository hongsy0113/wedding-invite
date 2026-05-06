"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Group = {
  name: string;
  prefixes: string[];
  chunkSize: number;
  manualOrder: string[];
  effectiveOrder: string[];
};

type ApiResponse = {
  groups: Group[];
  appendUnmatched: boolean;
  hasPassword: boolean;
};

type DragItem = {
  groupName: string;
  index: number;
};

type DropTarget = {
  groupName: string;
  index: number;
};

function reorder(items: string[], from: number, to: number) {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export default function GalleryOrderAdminPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [password, setPassword] = useState("");
  const [hasPassword, setHasPassword] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dragItem, setDragItem] = useState<DragItem | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

  const headers = useMemo(
    () =>
      password
        ? {
            "x-gallery-admin-password": password,
          }
        : {},
    [password]
  );

  async function load() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/gallery-order", {
      headers,
      cache: "no-store",
    });

    if (res.status === 401) {
      setNeedsAuth(true);
      setLoading(false);
      return;
    }

    if (!res.ok) {
      setLoading(false);
      setMessage("불러오기에 실패했습니다.");
      return;
    }

    const data = (await res.json()) as ApiResponse;
    setGroups(data.groups);
    setHasPassword(data.hasPassword);
    setNeedsAuth(false);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const onDropAt = (groupName: string, dropIndex: number) => {
    if (!dragItem) return;
    if (dragItem.groupName !== groupName) return;

    setGroups((prev) =>
      prev.map((group) => {
        if (group.name !== groupName) return group;
        return {
          ...group,
          effectiveOrder: reorder(group.effectiveOrder, dragItem.index, dropIndex),
        };
      })
    );
    setDragItem(null);
    setDropTarget(null);
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/gallery-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        groups: groups.map((group) => ({
          name: group.name,
          manualOrder: group.effectiveOrder,
        })),
      }),
    });

    if (res.status === 401) {
      setNeedsAuth(true);
      setSaving(false);
      setMessage("비밀번호가 올바르지 않습니다.");
      return;
    }

    if (!res.ok) {
      setSaving(false);
      setMessage("저장에 실패했습니다.");
      return;
    }

    const data = (await res.json()) as { groups: Group[] };
    setGroups(data.groups);
    setSaving(false);
    setMessage("저장 완료. 이제 `npm run images:optimize`를 실행하면 새 순서가 반영됩니다.");
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-gray-900">
      <h1 className="text-2xl font-semibold">갤러리 순서 설정</h1>
      <p className="mt-2 text-sm text-gray-600">
        그룹 규칙은 유지되고, 그룹 내부 순서만 드래그로 바꿉니다. 현재 규칙: HI 3장, DS 3장 반복
      </p>

      {needsAuth ? (
        <div className="mt-6 rounded-lg border border-gray-300 p-4">
          <p className="text-sm">관리자 비밀번호를 입력해주세요.</p>
          <div className="mt-3 flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="비밀번호"
            />
            <button
              type="button"
              onClick={load}
              className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            >
              확인
            </button>
          </div>
        </div>
      ) : null}

      {!loading && !needsAuth ? (
        <div className="mt-6 space-y-8">
          {groups.map((group) => (
            <section key={group.name} className="rounded-lg border border-gray-200 p-4">
              <h2 className="text-lg font-semibold">
                {group.name} ({group.prefixes.join(", ")})
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                한 번에 {group.chunkSize}장씩 교차 노출됩니다. 아래에서 순서를 드래그로 조정하세요.
              </p>

              <ul className="mt-4 grid grid-cols-3 gap-2">
                {group.effectiveOrder.map((fileName, idx) => (
                  <li
                    key={`${group.name}-${fileName}-${idx}`}
                    draggable
                    onDragStart={() => {
                      setDragItem({ groupName: group.name, index: idx });
                      setDropTarget({ groupName: group.name, index: idx });
                    }}
                    onDragEnd={() => {
                      setDragItem(null);
                      setDropTarget(null);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (!dragItem || dragItem.groupName !== group.name) return;
                      setDropTarget({ groupName: group.name, index: idx });
                    }}
                    onDrop={() => onDropAt(group.name, idx)}
                    className={`relative cursor-move rounded-md border bg-white p-2 transition ${
                      dragItem?.groupName === group.name && dragItem.index === idx
                        ? "border-gray-300 opacity-55"
                        : "border-gray-200"
                    }`}
                  >
                    {dropTarget?.groupName === group.name && dropTarget.index === idx ? (
                      <div className="pointer-events-none absolute -top-1 left-1 right-1 h-1 rounded bg-emerald-500" />
                    ) : null}
                    <Image
                      src={`/image/optimized/thumb/${encodeURIComponent(fileName)}`}
                      alt={fileName}
                      width={320}
                      height={320}
                      className="aspect-square w-full rounded object-cover"
                    />
                    <p className="mt-1 truncate text-[11px] text-gray-700">{fileName}</p>
                  </li>
                ))}
                <li
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!dragItem || dragItem.groupName !== group.name) return;
                    setDropTarget({ groupName: group.name, index: group.effectiveOrder.length });
                  }}
                  onDrop={() => onDropAt(group.name, group.effectiveOrder.length)}
                  className={`relative flex aspect-square items-center justify-center rounded-md border border-dashed text-[11px] ${
                    dropTarget?.groupName === group.name &&
                    dropTarget.index === group.effectiveOrder.length
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  맨 뒤에 놓기
                </li>
              </ul>
            </section>
          ))}

          <div className="sticky bottom-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white/95 p-3 backdrop-blur">
            <p className="text-xs text-gray-600">
              {hasPassword ? "비밀번호 보호 사용 중" : "비밀번호 보호 없음 (환경변수 미설정)"}
            </p>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {saving ? "저장 중..." : "순서 저장"}
            </button>
          </div>
        </div>
      ) : null}

      {loading && !needsAuth ? <p className="mt-6 text-sm text-gray-500">불러오는 중...</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
    </main>
  );
}
